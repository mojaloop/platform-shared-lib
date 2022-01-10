import { ConsoleLogger } from '@mojaloop/logging-bc-logging-client-lib/dist/index'
import * as RDKafka from 'node-rdkafka/index'
import { MLKafkaProducer, MLKafkaProducerOptions } from './rdkafka_producer'
import {IMessageProducer} from "@mojaloop/platform-shared-lib-messaging-types-lib";

const logger: ConsoleLogger = new ConsoleLogger()
let client: MLKafkaProducer
let options: MLKafkaProducerOptions

async function start () {
  options = {
    kafkaBrokerList: 'localhost:9092',
    producerClientId: 'test_producer'
  }

  client = new MLKafkaProducer(options, logger)

  client.on('deliveryReport', (topic: string, partition: number|null, offset: number|null) => {
    console.log(`delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`)
  })

  await client.connect()

  const msgs = []
  for (let i = 0; i < 10; i++) {
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
}

setTimeout(async function () {
  await start()
  console.log('done starting')

  process.exit(0)
}, 0)
