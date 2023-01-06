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
import {ConsoleLogger, LogLevel} from "@mojaloop/logging-bc-public-types-lib";

import {
    IRawMessage,
    MLKafkaRawConsumer,
    MLKafkaRawConsumerOptions,
    MLKafkaRawConsumerOutputType,
    MLKafkaRawProducer,
    MLKafkaRawProducerOptions
} from "../../src/";

jest.setTimeout(10000); // 10 secs - change this to suit the test (ms)

const logger: ConsoleLogger = new ConsoleLogger();
//logger.setLogLevel(LogLevel.WARN);

let kafkaProducer: MLKafkaRawProducer;
let producerOptions: MLKafkaRawProducerOptions;
let kafkaConsumer: MLKafkaRawConsumer;
let consumerOptions: MLKafkaRawConsumerOptions;

const TOPIC_NAME_RAW = "nodejs-rdkafka-producer-raw-test-topic";

const KAFKA_URL = process.env["KAFKA_URL"] || "localhost:9092";

describe("RAW - nodejs-rdkafka", () => {

    beforeAll(async () => {
         // producer needed for the tests
        producerOptions = {
            kafkaBrokerList: KAFKA_URL,
            producerClientId: "test_producer_" + Date.now()
        };

        kafkaProducer = new MLKafkaRawProducer(producerOptions, logger); // test with logger
        await kafkaProducer.connect();

        // need to wait a bit as a consequence of the connects() and start() being called in sequence
        await new Promise(f=> setTimeout(f, 500));
    });

    afterAll(async () => {
        // Cleanup
        //await kafkaProducer.disconnect();
        await kafkaProducer.destroy();
        //await kafkaConsumer.destroy(false);
    });

    afterEach(async () => {
        // Cleanup
        if(kafkaConsumer) {
            await kafkaConsumer.stop();
            await kafkaConsumer.disconnect();
            await kafkaConsumer.destroy(false);
        }
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


    test("RAW - produce and received delivery reports", async () => {
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
                    return resolve();
                }
                return;
            });

            await kafkaProducer.connect();

            const msgs = []
            for (let i = 0; i < messageCount; i++) {
                msgs.push({
                    topic: TOPIC_NAME_RAW,
                    value: {testProp: i},
                    key: null,
                    headers: [
                        {key1: Buffer.from("testStr")}
                    ]
                })
            }

            await kafkaProducer.send(msgs);
            // console.log('done sending')
        });
    });

    test("RAW - produce and consume json", async () => {
        consumerOptions = {
            kafkaBrokerList: KAFKA_URL,
            kafkaGroupId: "test_consumer_group_" + Date.now(),
            outputType: MLKafkaRawConsumerOutputType.Json
        };

        kafkaConsumer = new MLKafkaRawConsumer(consumerOptions, logger);

        const messageCount = 10;
        let receivedMessageCount = 0;
        let receivedMessage: any = {};
        const msgTopic = TOPIC_NAME_RAW
        const msgValue = {testProp: Date.now(), index:-1}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function exit(){
                await kafkaConsumer.destroy(true);
                return resolve();
            }

            async function handler(message: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)
                receivedMessageCount++;
                receivedMessage = message;
                // resolve();
                // return;

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

                if(receivedMessageCount == messageCount)
                    exit();
            }

            kafkaConsumer.setCallbackFn(handler);
            kafkaConsumer.setTopics([msgTopic]);

            await kafkaConsumer.connect();
            await kafkaConsumer.start();

            // need to wait a bit as a consequence of the connects() and start() being called in sequence
            await new Promise(f=> setTimeout(f, 500));

            kafkaProducer.once("deliveryReport", (topic, partition, offset) => {
                console.log("deliveryReport");
            })

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
        });
    });

    test("RAW - produce and consume string", async () => {
        consumerOptions = {
            kafkaBrokerList: KAFKA_URL,
            kafkaGroupId: "test_consumer_group_" + Date.now(),
            outputType: MLKafkaRawConsumerOutputType.String
        };

        kafkaConsumer = new MLKafkaRawConsumer(consumerOptions, logger);

        let receivedMessageCount = 0;
        let receivedMessage: any = {};
        const msgTopic = TOPIC_NAME_RAW
        const msgValue = {testProp: Date.now()}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function handler(message: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)
                receivedMessageCount++;
                receivedMessage = message;

                expect(receivedMessage.topic).toEqual(msgTopic);
                expect(receivedMessage.value).not.toBeNull();
                expect(receivedMessage.value).toEqual(JSON.stringify(msgValue));

                expect(receivedMessage.headers).not.toBeNull();
                expect(receivedMessage.headers).toBeInstanceOf(Array);
                const headerObj: { key1: Buffer }[] = receivedMessage.headers as { key1: Buffer }[];

                expect(headerObj[0]).not.toBeNull();
                expect(headerObj[0].key1).toEqual(msgHeader.key1.toString()); // for raw consumer compare with buffer

                resolve();
            }

            kafkaConsumer.setCallbackFn(handler);
            kafkaConsumer.setTopics([msgTopic]);

            await kafkaConsumer.connect();
            await kafkaConsumer.start();

            // need to wait a bit as a consequence of the connects() and start() being called in sequence
            await new Promise(f=> setTimeout(f, 500));

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

    test("RAW - produce and consume binary AND useSyncCommit", async () => {
        consumerOptions = {
            kafkaBrokerList: KAFKA_URL,
            kafkaGroupId: "test_consumer_group_" + Date.now(),
            outputType: MLKafkaRawConsumerOutputType.Raw,
            useSyncCommit: true
        };

        kafkaConsumer = new MLKafkaRawConsumer(consumerOptions, logger);

        let receivedMessageCount = 0;
        let receivedMessage: any = {};
        const msgTopic = TOPIC_NAME_RAW
        const msgValue = {testProp: Date.now()}
        const msgHeader = {key1: Buffer.from("testStr")};

        return new Promise<void>(async (resolve) => {
            async function handler(message: IRawMessage): Promise<void> {
                logger.debug(`Got message in handler: ${JSON.stringify(receivedMessage, null, 2)}`)
                receivedMessageCount++;
                receivedMessage = message;

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

                resolve();
            }

            kafkaConsumer.setCallbackFn(handler);
            kafkaConsumer.setTopics([msgTopic]);

            await kafkaConsumer.connect();
            await kafkaConsumer.start();

            // need to wait a bit as a consequence of the connects() and start() being called in sequence
            await new Promise(f=> setTimeout(f, 500));

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
