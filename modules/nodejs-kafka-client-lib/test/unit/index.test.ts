"use strict"

import {ConsoleLogger} from "@mojaloop/logging-bc-logging-client-lib";
import { MLKafkaProducer, MLKafkaProducerOptions } from '../../src/rdkafka_producer'

jest.setTimeout(300); // change this to suit the test

const logger: ConsoleLogger = new ConsoleLogger()
let client: MLKafkaProducer
let options: MLKafkaProducerOptions

describe('nodejs-rdkafka-producer', () => {

  beforeAll(async () => {
    options = {
      kafkaBrokerList: 'localhost:9092',
      producerClientId: 'test_producer'
    }

    client = new MLKafkaProducer(options, logger)
  })

  afterAll(async () => {
    // Cleanup
  })

  test('produce and received delivery reports', async () => {
    const messageCount = 1;
    let receivedMessages = 0;

    client.on('deliveryReport', (topic: string, partition: number|null, offset: number|null) => {
      console.log(`delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`);
      receivedMessages++;
      if(receivedMessages >= messageCount){
        console.log('Received all delivery reports, finishing test');
        return Promise.resolve();
      }
      return;
    })

    await client.connect()

    const msgs = []
    for (let i = 0; i < messageCount; i++) {
      msgs.push({
        topic: 'TestTopic',
        value: { testProp: i },
        key: null,
        headers: [
          { key1: Buffer.from('testStr') }
        ]
      })
    }

    await client.send(msgs)

    console.log('done sending')
    await client.disconnect()

  })
})
