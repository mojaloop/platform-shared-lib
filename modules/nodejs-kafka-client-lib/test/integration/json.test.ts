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

'use strict'
import {ConsoleLogger, LogLevel} from "@mojaloop/logging-bc-public-types-lib";
import {IMessage, MessageTypes} from "@mojaloop/platform-shared-lib-messaging-types-lib";

import {
    MLKafkaJsonConsumer,
    MLKafkaJsonConsumerOptions,
    MLKafkaJsonProducer,
    MLKafkaJsonProducerOptions, MLKafkaRawConsumer, MLKafkaRawConsumerOutputType, MLKafkaRawProducer
} from "../../src/";


jest.setTimeout(20000); // 20 secs - change this to suit the test (ms)

const logger: ConsoleLogger = new ConsoleLogger();
//logger.setLogLevel(LogLevel.WARN);

let kafkaProducer: MLKafkaJsonProducer;
let producerOptions: MLKafkaJsonProducerOptions;
let kafkaConsumer: MLKafkaJsonConsumer;
let consumerOptions: MLKafkaJsonConsumerOptions;

const TOPIC_NAME_JSON = "nodejs-rdkafka-producer-json-test-topic";

const KAFKA_URL = process.env["KAFKA_URL"] || "localhost:9092";

describe("JSON - nodejs-rdkafka", () => {

    beforeAll(async () => {
        producerOptions = {
            kafkaBrokerList: KAFKA_URL,
            producerClientId: 'test_producer_' + Date.now()
        };

        kafkaProducer = new MLKafkaJsonProducer(producerOptions, logger);
        await kafkaProducer.connect();
        await new Promise(f=> setTimeout(f, 500));

        consumerOptions = {
            kafkaBrokerList: KAFKA_URL,
            kafkaGroupId: "test_consumer_group_" + Date.now(),
        };

        kafkaConsumer = new MLKafkaJsonConsumer(consumerOptions, logger);

        // need to wait a bit as a consequence of the connects() and start() being called in sequence
        await new Promise(f=> setTimeout(f, 500));
    });

    afterAll(async () => {
        // Cleanup
        await kafkaProducer.disconnect();
        await kafkaProducer.destroy();

        await kafkaConsumer.stop();
        await kafkaConsumer.disconnect();
        await kafkaConsumer.destroy(false);
    });

    test("JSON - constructor tests", ()=>{
        // producer constructor tests
        new MLKafkaJsonProducer(producerOptions); // test no logger

        // consumer constructor tests
        new MLKafkaJsonConsumer(consumerOptions); // test no logger
    });

    test("JSON - produce and received delivery reports", async () => {
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
                    msgTopic: TOPIC_NAME_JSON,
                    payload: {
                        testProp: "propValue"
                    },
                    fspiopOpaqueState: {}
                })
            }

            await kafkaProducer.send(msgs)
        });
    });


    test("JSON - produce and consume json (with filters)", async () => {
        let receivedMessageCount = 0;
        // let receivedMessage: any = {};

        const filterOutMsgName = "badMessageName";

        const messages: IMessage[] =[ {
            msgId: "msgId",
            msgName: filterOutMsgName,
            msgKey: "msgKey",
            msgType: MessageTypes.DOMAIN_EVENT,
            msgTimestamp: Date.now(),
            msgPartition: 42,
            msgOffset: 31415,
            msgTopic: TOPIC_NAME_JSON,
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
            msgPartition: 42,
            msgOffset: 31415,
            msgTopic: TOPIC_NAME_JSON,
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
                expect(message.msgTimestamp).toEqual(messages[1].msgTimestamp);
                //expect(message.msgPartition).toEqual(testMsg.msgPartition);
                //expect(message.msgOffset).toEqual(testMsg.msgOffset);
                expect(message.msgTopic).toEqual(messages[1].msgTopic);

                expect(message.payload).not.toBeNull();
                expect(message.payload).toBeInstanceOf(Object);
                expect(message.payload).toHaveProperty("testProp");

                const msgValObj: { testProp: string } = message.payload as { testProp: string };
                expect(msgValObj.testProp).toEqual(messages[1].payload.testProp);
                // expect(msgValObj.testProp).toEqual(0); // uncomment to test that the test is testing ;)

                if(receivedMessageCount == 2)
                    resolve();
            }

            kafkaConsumer.setFilteringFn(message => {
                return message.msgName !== filterOutMsgName;
            });

            kafkaConsumer.setCallbackFn(handler);
            kafkaConsumer.setTopics([TOPIC_NAME_JSON]);

            await kafkaConsumer.connect();
            await kafkaConsumer.start();


            // need to wait a bit as a consequence of the connects() and start() being called in sequence
            await new Promise(f=> setTimeout(f, 500));

            await kafkaProducer.send(messages);     // test send with array
            await kafkaProducer.send(messages[1]);  // test send with single msg
        });


    })
})
