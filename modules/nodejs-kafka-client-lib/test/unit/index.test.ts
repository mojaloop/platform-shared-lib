"use strict"

import {MLKafkaConsumer, MLKafkaConsumerOptions, MLKafkaConsumerOutputType} from "../../src/rdkafka_consumer";
import * as RDKafka from "node-rdkafka";
import {ConsoleLogger} from "@mojaloop/logging-bc-logging-client-lib";
import {IMessage} from "@mojaloop/platform-shared-lib-messaging-types-lib/dist/index";

jest.setTimeout(300000); // change this to suite the test


const topicNames = ["TestTopic"]

describe('example test', () => {

  let logger: ConsoleLogger = new ConsoleLogger();
  let client: MLKafkaConsumer;
  let globalConfs: RDKafka.ConsumerGlobalConfig;
  let topicConfs: RDKafka.ConsumerTopicConfig;
  let consumerOptions:MLKafkaConsumerOptions;

  beforeAll(async () => {
    globalConfs = {
      //'debug': 'all',
      "metadata.broker.list": "localhost:9092",
      "group.id": "unitTests_1"+Date.now().toLocaleString(),
    }
    topicConfs = {}
    consumerOptions = {
      useSyncCommit: false,
      outputType: MLKafkaConsumerOutputType.Raw
    }

    client = new MLKafkaConsumer(globalConfs, topicConfs, logger, consumerOptions)
  })

  afterAll(async () => {
    // Cleanup
  })

  test('should goes here', async () => {

    function handler(message: IMessage) : Promise<void>{
      logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`);
      return Promise.resolve();
    }

    client.setCallbackFn(handler)
    client.setTopics(topicNames)

    await client.connect()
    console.log("connect done");

    await client.start()
    console.log("start done");

    setInterval(() => {
      console.log("complete");
    }, 1 << 30);
  })
})
