"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rdkafka_consumer_1 = require("../../src/rdkafka_consumer");
const logging_bc_logging_client_lib_1 = require("@mojaloop/logging-bc-logging-client-lib");
jest.setTimeout(300000); // change this to suite the test
const topicNames = ["TestTopic"];
describe('example test', () => {
    let logger = new logging_bc_logging_client_lib_1.ConsoleLogger();
    let client;
    let globalConfs;
    let topicConfs;
    let consumerOptions;
    beforeAll(async () => {
        globalConfs = {
            //'debug': 'all',
            "metadata.broker.list": "localhost:9092",
            "group.id": "unitTests_1" + Date.now().toLocaleString(),
        };
        topicConfs = {};
        consumerOptions = {
            useSyncCommit: false,
            outputType: rdkafka_consumer_1.MLKafkaConsumerOutputType.Raw
        };
        client = new rdkafka_consumer_1.MLKafkaConsumer(globalConfs, topicConfs, logger, consumerOptions);
    });
    afterAll(async () => {
        // Cleanup
    });
    test('should goes here', async () => {
        function handler(message) {
            logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`);
            return Promise.resolve();
        }
        client.setCallbackFn(handler);
        client.setTopics(topicNames);
        await client.connect();
        console.log("connect done");
        await client.start();
        console.log("start done");
        setInterval(() => {
            console.log("complete");
        }, 1 << 30);
    });
});
//# sourceMappingURL=index.test.js.map