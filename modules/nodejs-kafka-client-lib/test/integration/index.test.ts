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
import {ConsoleLogger} from "@mojaloop/logging-bc-logging-client-lib";
import { IMessage } from '@mojaloop/platform-shared-lib-messaging-types-lib'

import { MLKafkaProducer, MLKafkaProducerOptions } from '../../src/rdkafka_producer'
import { MLKafkaConsumer, MLKafkaConsumerOptions, MLKafkaConsumerOutputType } from '../../src/rdkafka_consumer'

jest.setTimeout(10000); // 10 secs - change this to suit the test (ms)

const logger: ConsoleLogger = new ConsoleLogger()
let kafkaProducer: MLKafkaProducer
let producerOptions: MLKafkaProducerOptions
let kafkaConsumer: MLKafkaConsumer
let consumerOptions: MLKafkaConsumerOptions

const TOPIC_NAME = 'nodejs-rdkafka-producer-unit-test-topic'

describe('nodejs-rdkafka-producer', () => {

  beforeAll(async () => {
    producerOptions = {
      kafkaBrokerList: 'localhost:9092',
      producerClientId: 'test_producer'
    }

    kafkaProducer = new MLKafkaProducer(producerOptions, logger)

    consumerOptions = {
      kafkaBrokerList: 'localhost:9092',
      kafkaGroupId: 'test_consumer_group_'+Date.now(),
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

    return new Promise<void>(async resolve => {
      const msgTopic = TOPIC_NAME
      const msgValue = {testProp: Date.now()}
      const msgHeader = {key1: Buffer.from('testStr')};

      async function handler(message: IMessage): Promise<void> {
        logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`)

        //expect(message.topic).not.toEqual(msgTopic)

        expect(message.topic).toEqual(msgTopic)

        expect(message.value).not.toBeNull()
        expect(message.value).toBeInstanceOf(Object)
        expect(message.value).toHaveProperty('testProp')

        const msgValObj:{testProp: number} = message.value as {testProp: number}

        expect(msgValObj.testProp).toEqual(msgValue.testProp)
//        expect(msgValObj.testProp).toEqual(0) // uncomment to test that the test is testing ;)

        expect(message.headers).not.toBeNull()
        expect(message.headers).toBeInstanceOf(Array)
        const headerObj:{key1: Buffer}[] = message.headers as {key1: Buffer}[]

        expect(headerObj[0]).not.toBeNull()
        expect(headerObj[0].key1).toEqual(msgHeader.key1.toString()) // for raw consumer compare with buffer

        logger.info("Got correct message")
        return resolve();
      }

      kafkaConsumer.setCallbackFn(handler)
      kafkaConsumer.setTopics([msgTopic])
      await kafkaConsumer.connect()
      await kafkaConsumer.start()

      await kafkaProducer.connect()

      await kafkaProducer.send({
        topic: msgTopic,
        value: msgValue,
        key: null,
        headers: [
        msgHeader
        ]
      })

    })

  })

})
