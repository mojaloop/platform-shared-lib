/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 * Crosslake
 - Pedro Sousa Barreto <pedrob@crosslaketech.com>

 --------------
 ******/

'use strict'
import {ConsoleLogger, LogLevel} from "@mojaloop/logging-bc-public-types-lib";
import {IMessage, MessageTypes} from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {randomInt} from "crypto";
import * as RDKafka from "node-rdkafka";

import {
    IRawMessage,
    MLKafkaJsonConsumer,
    MLKafkaJsonConsumerOptions,
    MLKafkaJsonProducer,
    MLKafkaJsonProducerOptions, MLKafkaRawConsumer, MLKafkaRawConsumerOutputType, MLKafkaRawProducer
} from "../../src/";

const MAX_NUMBER_OF_TOPICS = 5; // increase this if you need more topics to be created for the tests

const TEST_GENERATION = randomInt(9999);
//base name for topics and consumer groups used
const TEST_BASE_NAME = `nodejs-kafka-client-lib-json-test_${TEST_GENERATION}`;
const KAFKA_URL = process.env["KAFKA_URL"] || "localhost:9092";
const CONSUMER_SESSION_TIMEOUT_MS = 7_000;

jest.setTimeout(60000); // 60 secs - change this to suit the test (ms)

const logger: ConsoleLogger = new ConsoleLogger();
logger.setLogLevel(LogLevel.INFO);

let kafkaProducer: MLKafkaJsonProducer;
let producerOptions: MLKafkaJsonProducerOptions;
let adminClient: RDKafka.IAdminClient;

describe("JSON - nodejs-rdkafka", () => {

    beforeAll(async () => {
        // create topics directly
        adminClient = RDKafka.AdminClient.create({
            "client.id": "nodejs-rdkafka-producer-raw-test_admin_client",
            "metadata.broker.list": KAFKA_URL
        });

        function createTopic(topic: string): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                adminClient.createTopic({
                    topic: topic, num_partitions: 1, replication_factor: 1
                }, (err) => {
                    //if(err) return reject(err);
                    resolve();
                });
            });
        }

        const indexes = Array.from(Array(MAX_NUMBER_OF_TOPICS), (x, i) => i)

        for (const i of indexes) {
            await createTopic(`${TEST_BASE_NAME}_${i}`);
        }

        producerOptions = {
            kafkaBrokerList: KAFKA_URL,
            producerClientId: 'test_producer_' + Date.now()
        };

        kafkaProducer = new MLKafkaJsonProducer(producerOptions, logger);
        await kafkaProducer.connect();
    });

    afterAll(async () => {
        // Cleanup - deleting created topics
        function deleteTopic(topic: string): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                adminClient.deleteTopic(topic, (err) => {
                    resolve();
                });
            });
        }

        for (const i of Array.from(Array(MAX_NUMBER_OF_TOPICS), (x, i) => i)) {
            await deleteTopic(`${TEST_BASE_NAME}_${i}`);
        }

        // destroy the producer
        await kafkaProducer.destroy();
        // wait until everything is completed (logs and other events)
        await new Promise(f => setTimeout(f, 1000));
    });

    test("JSON - constructor tests", ()=>{
        // producer constructor tests
        new MLKafkaJsonProducer(producerOptions); // test no logger

        // consumer constructor tests
        new MLKafkaJsonConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS, // min is 6 secs, this should about it
            kafkaGroupId: "test_consumer_group",
        }); // test no logger
    });

    test("JSON - produce and received delivery reports - #0", async () => {
        const messageCount = 1;
        let receivedMessages = 0;

        return new Promise<void>(async (resolve) => {
            kafkaProducer.setDeliveryReportFn((topic: string, partition: number, offset: number) => {
                // console.log(`delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`);
                receivedMessages++;
                if (receivedMessages >= messageCount) {
                    // disable this handler
                    kafkaProducer.setDeliveryReportFn(null);
                    return resolve();
                }
                return;
            });

            //await kafkaProducer.connect()

            const msgs: IMessage[] = []
            for (let i = 0; i < messageCount; i++) {
                msgs.push({
                    msgId: "msgId",
                    msgName: "msgName",
                    msgKey: "msgKey",
                    msgType: MessageTypes.DOMAIN_EVENT,
                    msgTimestamp: Date.now(),
                    msgPartition: null,
                    msgOffset: null,
                    msgTopic: TEST_BASE_NAME+"_0",
                    payload: {
                        testProp: "propValue"
                    },
                    fspiopOpaqueState: {}
                })
            }

            await kafkaProducer.send(msgs)
        });
    });

    test("JSON - produce and consume json (with filters) - startAndWaitForRebalance() - #1", async () => {
        const kafkaConsumer = new MLKafkaJsonConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS,
            kafkaGroupId: TEST_BASE_NAME + "_1",
        }, logger);
        const msgTopic = TEST_BASE_NAME + "_1";

        let receivedMessageCount = 0;
        // let receivedMessage: any = {};

        const filterOutMsgName = "badMessageName";

        const messages: IMessage[] = [{
            msgId: "msgId",
            msgName: filterOutMsgName,
            msgKey: "msgKey",
            msgType: MessageTypes.DOMAIN_EVENT,
            msgTimestamp: Date.now(),
            msgPartition: 0,
            msgOffset: 31415,
            msgTopic: msgTopic,
            payload: {
                testProp: "propValue"
            },
            fspiopOpaqueState: {}
        }, {
            msgId: "msgId",
            msgName: "msgName",
            msgKey: "msgKey",
            msgType: MessageTypes.DOMAIN_EVENT,
            msgTimestamp: Date.now(),
            msgPartition: 0,
            msgOffset: 31415,
            msgTopic: msgTopic,
            payload: {
                testProp: "propValue"
            },
            fspiopOpaqueState: {}
        }];

        return new Promise<void>(async (resolve) => {
            async function handler(message: IMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`)
                receivedMessageCount++;

                expect(message.msgId).toEqual(messages[1].msgId);
                expect(message.msgName).toEqual(messages[1].msgName);

                expect(message.msgName).not.toEqual(filterOutMsgName);

                expect(message.msgKey).toEqual(messages[1].msgKey);
                //expect(message.msgTimestamp).toEqual(messages[1].msgTimestamp);
                //expect(message.msgPartition).toEqual(testMsg.msgPartition);
                //expect(message.msgOffset).toEqual(testMsg.msgOffset);
                expect(message.msgTopic).toEqual(messages[1].msgTopic);

                expect(message.payload).not.toBeNull();
                expect(message.payload).toBeInstanceOf(Object);
                expect(message.payload).toHaveProperty("testProp");

                const msgValObj: { testProp: string } = message.payload as { testProp: string };
                expect(msgValObj.testProp).toEqual(messages[1].payload.testProp);
                // expect(msgValObj.testProp).toEqual(0); // uncomment to test that the test is testing ;)

                if (receivedMessageCount==2) {
                    setTimeout(() => {
                        kafkaConsumer.stop();
                        kafkaConsumer.destroy(true);
                        resolve();
                    }, 100);
                }
            }

            kafkaConsumer.setFilteringFn(message => {
                return message.msgName!==filterOutMsgName;
            });

            kafkaConsumer.setTopics([msgTopic]);
            kafkaConsumer.setCallbackFn(handler);

            await kafkaConsumer.connect();
            await kafkaConsumer.startAndWaitForRebalance();

            await kafkaProducer.send(messages);     // test send with array
            await kafkaProducer.send(messages[1]);  // test send with single msg
        });


    })

    test("JSON - produce and consume json (with filters) - #2", async () => {
        const kafkaConsumer = new MLKafkaJsonConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS,
            kafkaGroupId: TEST_BASE_NAME + "_2",
        }, logger);
        const msgTopic = TEST_BASE_NAME + "_2";

        let receivedMessageCount = 0;
        // let receivedMessage: any = {};

        const filterOutMsgName = "badMessageName";

        const messages: IMessage[] =[ {
            msgId: "msgId",
            msgName: filterOutMsgName,
            msgKey: "msgKey",
            msgType: MessageTypes.DOMAIN_EVENT,
            msgTimestamp: Date.now(),
            msgPartition: 0,
            msgOffset: 31415,
            msgTopic: msgTopic,
            payload: {
                testProp: "propValue"
            },
            fspiopOpaqueState: {}
        },{
            msgId: "msgId",
            msgName: "msgName",
            msgKey: "msgKey",
            msgType: MessageTypes.DOMAIN_EVENT,
            msgTimestamp: Date.now(),
            msgPartition: 0,
            msgOffset: 31415,
            msgTopic: msgTopic,
            payload: {
                testProp: "propValue"
            },
            fspiopOpaqueState: {}
        }];

        return new Promise<void>(async (resolve) => {
            async function handler(message: IMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`)
                receivedMessageCount++;
   
                expect(message.msgId).toEqual(messages[1].msgId);
                expect(message.msgName).toEqual(messages[1].msgName);

                expect(message.msgName).not.toEqual(filterOutMsgName);

                expect(message.msgKey).toEqual(messages[1].msgKey);
                //expect(message.msgTimestamp).toEqual(messages[1].msgTimestamp);
                //expect(message.msgPartition).toEqual(testMsg.msgPartition);
                //expect(message.msgOffset).toEqual(testMsg.msgOffset);
                expect(message.msgTopic).toEqual(messages[1].msgTopic);

                expect(message.payload).not.toBeNull();
                expect(message.payload).toBeInstanceOf(Object);
                expect(message.payload).toHaveProperty("testProp");

                const msgValObj: { testProp: string } = message.payload as { testProp: string };
                expect(msgValObj.testProp).toEqual(messages[1].payload.testProp);
                // expect(msgValObj.testProp).toEqual(0); // uncomment to test that the test is testing ;)

                if(receivedMessageCount == 2){
                    setTimeout(() => {
                        kafkaConsumer.stop();
                        kafkaConsumer.destroy(true);
                        resolve();
                    }, 100);
                }
            }

            kafkaConsumer.setFilteringFn(message => {
                return message.msgName !== filterOutMsgName;
            });

            kafkaConsumer.setTopics([msgTopic]);
            kafkaConsumer.setCallbackFn(handler);

            //wait for the consumer to settle (to be rebalanced)
            kafkaConsumer.on("rebalance", async (type: "assign" | "revoke", assignments) => {
                if (type==="assign") {
                    await kafkaProducer.send(messages);     // test send with array
                    await kafkaProducer.send(messages[1]);  // test send with single msg
                }
            });

            await kafkaConsumer.connect();
            await kafkaConsumer.start();
        });


    })

    test("JSON - consume batch syncCommit - #3", async()=>{
        const batchSize = 10;
        const kafkaConsumer = new MLKafkaJsonConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS, // min is 6 secs, this should about it
            kafkaGroupId: TEST_BASE_NAME + "_3",
            useSyncCommit: true,
            batchSize: batchSize
        }, logger);

        const messageCount = 12; // has to be > batchSize and < than 2x batchSize

        const msgTopic = TEST_BASE_NAME + "_3";
        const msgValue = {testProp: Date.now(), index:0}
        let firstCall=true;

        return new Promise<void>(async (mainResolve) => {
            async function handler(receivedMessage: IMessage[]): Promise<void> {
                return new Promise<void>((handlerResolve) => {
                    //logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)

                    // size
                    if(firstCall) {
                        expect(receivedMessage.length).toBe(batchSize);

                        // order
                        const msg2 = receivedMessage[2].payload as any;
                        expect(msg2).not.toBeNull();
                        expect(msg2).toHaveProperty("index");
                        expect(msg2.index).toBe(2);

                        const msg5 = receivedMessage[5].payload as any;
                        expect(msg5).not.toBeNull();
                        expect(msg5).toHaveProperty("index");
                        expect(msg5.index).toBe(5);

                        const msg8 = receivedMessage[8].payload as any;
                        expect(msg8).not.toBeNull();
                        expect(msg8).toHaveProperty("index");
                        expect(msg8.index).toBe(8);

                        firstCall = false;
                    }else{
                        expect(receivedMessage.length).toBe(messageCount - batchSize);

                        // order
                        const msg10 = receivedMessage[0].payload as any;
                        expect(msg10).not.toBeNull();
                        expect(msg10).toHaveProperty("index");
                        expect(msg10.index).toBe(10);

                        const msg11 = receivedMessage[1].payload as any;
                        expect(msg11).not.toBeNull();
                        expect(msg11).toHaveProperty("index");
                        expect(msg11.index).toBe(11);

                        setTimeout(() => {
                            kafkaConsumer.stop();
                            kafkaConsumer.destroy(true);
                            mainResolve();
                        }, 100);
                    }

                    handlerResolve();
                });
            }

            kafkaConsumer.setTopics([msgTopic]);
            kafkaConsumer.setBatchCallbackFn(handler);

            await kafkaConsumer.connect();
            await kafkaConsumer.startAndWaitForRebalance();

            const msgs = []
            for (let i = 0; i < messageCount; i++) {
                msgs.push({
                    msgId: "msgId",
                    msgName: "msgName",
                    msgKey: "msgKey",
                    msgType: MessageTypes.DOMAIN_EVENT,
                    msgTimestamp: Date.now(),
                    msgPartition: 0,
                    msgOffset: 31415,
                    msgTopic: msgTopic,
                    payload: {
                        testProp: msgValue.testProp, index: i
                    },
                    fspiopOpaqueState: {}
                });
            }
            await kafkaProducer.send(msgs);
            console.log("Sent!");
        });
    })
})
