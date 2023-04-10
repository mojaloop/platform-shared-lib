/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list (alphabetical ordering) of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Crosslake
 - Pedro Sousa Barreto <pedrob@crosslaketech.com>

 --------------
 ******/

"use strict";
import * as crypto from "crypto";
import * as RDKafka from "node-rdkafka";
import {ConsoleLogger, LogLevel} from "@mojaloop/logging-bc-public-types-lib";

import {
    IRawMessage,
    MLKafkaRawConsumer,
    MLKafkaRawConsumerOutputType,
    MLKafkaRawProducer,
    MLKafkaRawProducerOptions
} from "../../src/";

const MAX_NUMBER_OF_TOPICS = 5; // increase this if you need more topics to be created for the tests

const TEST_GENERATION = crypto.randomInt(9999);
//base name for topics and consumer groups used
const TEST_BASE_NAME = `nodejs-kafka-client-lib-raw-test_${TEST_GENERATION}`;
const KAFKA_URL = process.env["KAFKA_URL"] || "localhost:9092";
const CONSUMER_SESSION_TIMEOUT_MS = 7_000;

jest.setTimeout(120000); // 60 secs - change this to suit the test (ms)

const logger = new ConsoleLogger();
logger.setLogLevel(LogLevel.DEBUG);

// producer needed for the tests
let kafkaProducer: MLKafkaRawProducer;
const producerOptions: MLKafkaRawProducerOptions = {
    kafkaBrokerList: KAFKA_URL,
    producerClientId: "test_producer_" + Date.now()
};
let adminClient: RDKafka.IAdminClient;

describe("RAW - nodejs-rdkafka", () => {

    beforeAll(async () => {
        // create topics directly
        adminClient = RDKafka.AdminClient.create({
            "client.id": "nodejs-rdkafka-producer-raw-test_admin_client",
            "metadata.broker.list": KAFKA_URL
        });

        function createTopic(topic:string):Promise<void>{
            return new Promise<void>((resolve, reject) => {
                adminClient.createTopic({
                    topic: topic, num_partitions: 1, replication_factor: 1
                }, (err) => {
                    //if(err) return reject(err);
                    resolve();
                });
            });
        }

        for(const i of Array.from(Array(MAX_NUMBER_OF_TOPICS), (x, i) => i)){
            await createTopic(`${TEST_BASE_NAME}_${i}`);
        }

        kafkaProducer = new MLKafkaRawProducer(producerOptions, logger); // test with logger
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

    afterEach(async () => {
        // Cleanup

    });

    test("RAW - constructor tests", ()=>{
        // producer constructor tests
        new MLKafkaRawProducer(producerOptions); // test no logger
        const notUsed = new MLKafkaRawProducer({
            kafkaBrokerList: KAFKA_URL,
            skipAcknowledgements: true
        });
        notUsed.disconnect(); // test disconnect not connected

        // consumer constructor tests
        new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            outputType: MLKafkaRawConsumerOutputType.Json
        }, logger);
        new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            outputType: MLKafkaRawConsumerOutputType.String
        }, logger);
        new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            outputType: MLKafkaRawConsumerOutputType.Raw
        }, logger);
        new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL
        });
    });

    test("RAW - produce and received delivery reports - #0", async () => {
        const messageCount = 1;
        let receivedMessages = 0;

        return new Promise<void>(async (resolve) => {
            //kafkaProducer.on('deliveryReport', (topic: string, partition: number | null, offset: number | null) => {
            kafkaProducer.setDeliveryReportFn((topic: string, partition: number, offset: number) => {
                // console.log(`delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`);
                receivedMessages++;
                if (receivedMessages >= messageCount) {
                    // console.log('Received all delivery reports, finishing test');

                    // disable this handler
                    kafkaProducer.setDeliveryReportFn(null);
                    setTimeout(() => {
                        resolve();
                    }, 500);
                    return;
                }
                return;
            });

            const msgs = []
            for (let i = 0; i < messageCount; i++) {
                msgs.push({
                    topic: TEST_BASE_NAME+"_0",
                    value: {testProp: i},
                    key: null,
                    headers: [
                        {key1: Buffer.from("testStr")}
                    ]
                })
            }

            await kafkaProducer.send(msgs);
        });
    });

    test("RAW - produce and consume json - #1", async () => {
        const kafkaConsumer = new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS, // min is 6 secs, this should about it
            kafkaGroupId: TEST_BASE_NAME+"_1",
            outputType: MLKafkaRawConsumerOutputType.Json
        }, logger);

        const messageCount = 10;
        let receivedMessageCount = 0;
        let receivedMessage: any = {};
        const msgTopic = TEST_BASE_NAME + "_1";
        const msgValue = {testProp: 123, index:-1}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function handler(message: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)
                receivedMessageCount++;
                receivedMessage = message;

                expect(receivedMessage.topic).toEqual(msgTopic);
                expect(receivedMessage.value).not.toBeNull();
                expect(receivedMessage.value).toBeInstanceOf(Object);
                expect(receivedMessage.value).toHaveProperty("testProp");

                const msgValObj: { testProp: number } = receivedMessage.value as { testProp: number };
                expect(msgValObj.testProp).toEqual(msgValue.testProp);
                // expect(msgValObj.testProp).toEqual(0); // uncomment to test that the test is testing ;)

                expect(receivedMessage.headers).not.toBeNull();
                expect(receivedMessage.headers).toBeInstanceOf(Array);
                const headerObj: { key1: Buffer }[] = receivedMessage.headers as { key1: Buffer }[];

                expect(headerObj[0]).not.toBeNull();
                expect(headerObj[0].key1).toEqual(msgHeader.key1.toString()); // for raw consumer compare with buffer

                if(receivedMessageCount == messageCount){
                    // defer the resolve to after finishing this handlerFn, to allow the consumer to commit the offset
                    setTimeout(() => {
                        kafkaConsumer.stop();
                        kafkaConsumer.destroy(true);
                        resolve();
                    }, 100);
                }
            }

            kafkaConsumer.setCallbackFn(handler);
            kafkaConsumer.setTopics([msgTopic]);

            //wait for the consumer to settle (to be rebalanced)
            kafkaConsumer.once("rebalance", async (type: "assign" | "revoke", assignments) => {
                if (type==="assign") {
                    const msgs = []
                    for (let i = 0; i < messageCount; i++) {
                        msgs.push({
                            topic: msgTopic,
                            value: {testProp: msgValue.testProp, index: i},
                            key: null,
                            headers: [
                                msgHeader
                            ]
                        });
                    }
                    await kafkaProducer.send(msgs);
                    console.log("Sent!");
                }
            });

            await kafkaConsumer.connect();
            await kafkaConsumer.start();

        });
    });

    test("RAW - produce and consume string - #2", async () => {
        const kafkaConsumer = new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS, // min is 6 secs, this should about it
            kafkaGroupId: TEST_BASE_NAME + "_2",
            outputType: MLKafkaRawConsumerOutputType.String
        }, logger);

        const msgTopic = TEST_BASE_NAME + "_2";
        const msgValue = {testProp: Date.now()}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function handler(receivedMessage: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)

                expect(receivedMessage.topic).toEqual(msgTopic);
                expect(receivedMessage.value).not.toBeNull();
                expect(receivedMessage.value).toEqual(JSON.stringify(msgValue));

                expect(receivedMessage.headers).not.toBeNull();
                expect(receivedMessage.headers).toBeInstanceOf(Array);
                const headerObj: { key1: Buffer }[] = receivedMessage.headers as { key1: Buffer }[];

                expect(headerObj[0]).not.toBeNull();
                expect(headerObj[0].key1).toEqual(msgHeader.key1.toString()); // for raw consumer compare with buffer

                setTimeout(() => {
                    kafkaConsumer.stop();
                    kafkaConsumer.destroy(true);
                    resolve();
                }, 100);
            }

            kafkaConsumer.setTopics([msgTopic]);
            kafkaConsumer.setCallbackFn(handler);

            //wait for the consumer to settle (to be rebalanced)
            kafkaConsumer.once("rebalance", async (type: "assign" | "revoke", assignments) => {
                if (type==="assign") {
                    await kafkaProducer.send({
                        topic: msgTopic,
                        value: msgValue,
                        key: null,
                        headers: [
                            msgHeader
                        ]
                    });
                }
            });

            await kafkaConsumer.connect();
            await kafkaConsumer.start();
            debugger;
        });
    });

    test("RAW - produce and consume string - with startAndWaitForRebalance() - #3", async () => {
        const kafkaConsumer = new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS, // min is 6 secs, this should about it
            kafkaGroupId: TEST_BASE_NAME + "_3",
            outputType: MLKafkaRawConsumerOutputType.String
        }, logger);

        const msgTopic = TEST_BASE_NAME + "_3";
        const msgValue = {testProp: Date.now()}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function handler(receivedMessage: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)

                expect(receivedMessage.topic).toEqual(msgTopic);
                expect(receivedMessage.value).not.toBeNull();
                expect(receivedMessage.value).toEqual(JSON.stringify(msgValue));

                expect(receivedMessage.headers).not.toBeNull();
                expect(receivedMessage.headers).toBeInstanceOf(Array);
                const headerObj: { key1: Buffer }[] = receivedMessage.headers as { key1: Buffer }[];

                expect(headerObj[0]).not.toBeNull();
                expect(headerObj[0].key1).toEqual(msgHeader.key1.toString()); // for raw consumer compare with buffer

                setTimeout(() => {
                    kafkaConsumer.stop();
                    kafkaConsumer.destroy(true);
                    resolve();
                }, 100);
            }

            kafkaConsumer.setTopics([msgTopic]);
            kafkaConsumer.setCallbackFn(handler);

            await kafkaConsumer.connect();
            await kafkaConsumer.startAndWaitForRebalance();

            await kafkaProducer.send({
                topic: msgTopic,
                value: msgValue,
                key: null,
                headers: [
                    msgHeader
                ]
            });
        });
    });

    test("RAW - produce and consume binary AND useSyncCommit - #4", async () => {
        const kafkaConsumer = new MLKafkaRawConsumer({
            kafkaBrokerList: KAFKA_URL,
            sessionTimeoutMs: CONSUMER_SESSION_TIMEOUT_MS, // min is 6 secs, this should about it
            kafkaGroupId: TEST_BASE_NAME + "_4",
            outputType: MLKafkaRawConsumerOutputType.Raw,
            useSyncCommit: true
        }, logger);

        const msgTopic = TEST_BASE_NAME + "_4";
        const msgValue = {testProp: Date.now()}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function handler(receivedMessage: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)

                expect(receivedMessage.topic).toEqual(msgTopic);
                expect(receivedMessage.value).not.toBeNull();
                expect(receivedMessage.value).toBeInstanceOf(Buffer);
                expect(receivedMessage.value).toEqual(Buffer.from(JSON.stringify(msgValue)));

                expect(receivedMessage.headers).not.toBeNull();
                expect(receivedMessage.headers).toBeInstanceOf(Array);
                const headerObj: { key1: Buffer }[] = receivedMessage.headers as { key1: Buffer }[];

                expect(headerObj[0]).not.toBeNull();
                expect(headerObj[0].key1).toBeInstanceOf(Buffer);
                expect(headerObj[0].key1).toEqual(msgHeader.key1); // for raw consumer compare with buffer

                setTimeout(() => {
                    kafkaConsumer.stop();
                    kafkaConsumer.destroy(true);
                    resolve();
                }, 100);
            }

            kafkaConsumer.setTopics([msgTopic]);
            kafkaConsumer.setCallbackFn(handler);

            //wait for the consumer to settle (to be rebalanced)
            kafkaConsumer.once("rebalance", async (type: "assign" | "revoke", assignments) => {
                if (type==="assign") {
                    await kafkaProducer.send({
                        topic: msgTopic,
                        value: msgValue,
                        key: null,
                        headers: [
                            msgHeader
                        ]
                    });
                }
            });

            await kafkaConsumer.connect();
            await kafkaConsumer.start();
        });
    });

   /* test("RAW - produce with custom partitioner", async () => {
        const options:MLKafkaRawProducerOptions = {
            kafkaBrokerList: KAFKA_URL,
            producerClientId: "custom_partitioner_test_producer_" + Date.now(),
            // partitionerFn: (key, partitionCount, opaque) => {
            //     debugger;
            //     return 0;
            // },
            partitionerFn: function(){
                debugger;
                return 0;
            }
        };
        logger.setLogLevel(LogLevel.INFO);
        const producer: MLKafkaRawProducer = new MLKafkaRawProducer(options, logger);
        await producer.connect();

        // need to wait a bit as a consequence of the connects() and start() being called in sequence
        await new Promise(f => setTimeout(f, 500));

        debugger;
        await producer.send({
            topic: "msgTopic",
            value: {key: "1"},
            key: "1"
        });

        debugger;
    });*/
})
