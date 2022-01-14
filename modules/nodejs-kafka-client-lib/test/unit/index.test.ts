"use strict"

import {ConsoleLogger} from "@mojaloop/logging-bc-logging-client-lib";
import { IMessage } from '@mojaloop/platform-shared-lib-messaging-types-lib'

import { MLKafkaProducer, MLKafkaProducerOptions } from '../../src/rdkafka_producer'
import { MLKafkaConsumer, MLKafkaConsumerOptions, MLKafkaConsumerOutputType } from '../../src/rdkafka_consumer'

//jest.setTimeout(30000); // change this to suit the test (ms)

const logger: ConsoleLogger = new ConsoleLogger()
let kafkaProducer: MLKafkaProducer
let producerOptions: MLKafkaProducerOptions
let kafkaConsumer: MLKafkaConsumer
let consumerOptions: MLKafkaConsumerOptions

const TOPIC_NAME = "nodejs-rdkafka-producer-unit-test-topic"

describe('nodejs-rdkafka-producer', () => {

  beforeAll(async () => {
    producerOptions = {
      kafkaBrokerList: 'localhost:9092',
      producerClientId: 'test_producer'
    }

    kafkaProducer = new MLKafkaProducer(producerOptions, logger)

    consumerOptions = {
      kafkaBrokerList: 'localhost:9092',
      kafkaGroupId: 'test_consumer_group',
      outputType: MLKafkaConsumerOutputType.Json
    }

    kafkaConsumer = new MLKafkaConsumer(consumerOptions, logger)
  })

  afterAll(async () => {
    // Cleanup
    await kafkaProducer.destroy()
    await kafkaConsumer.destroy(false)
  })

  test('produce and received delivery reports', async () => {
    const messageCount = 1;
    let receivedMessages = 0;

    kafkaProducer.on('deliveryReport', (topic: string, partition: number|null, offset: number|null) => {
      // console.log(`delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`);
      receivedMessages++;
      if(receivedMessages >= messageCount){
        // console.log('Received all delivery reports, finishing test');
        return Promise.resolve();
      }
      return;
    })

    await kafkaProducer.connect()

    const msgs = []
    for (let i = 0; i < messageCount; i++) {
      msgs.push({
        topic: TOPIC_NAME,
        value: { testProp: i },
        key: null,
        headers: [
          { key1: Buffer.from('testStr') }
        ]
      })
    }

    await kafkaProducer.send(msgs)
    // console.log('done sending')
  })

  test('produce and consume json', async () => {

    async function handler (message: IMessage): Promise<void> {
      logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`)
      return await Promise.resolve()
    }

    kafkaConsumer.setCallbackFn(handler)
    kafkaConsumer.setTopics([TOPIC_NAME])
    await kafkaConsumer.connect()

    await kafkaProducer.connect()

    await kafkaProducer.send({
      topic: TOPIC_NAME,
      value: { testProp: 0 },
      key: null,
      headers: [
        { key1: Buffer.from('testStr') }
      ]
    })

    //console.log('done sending')
  })

})
