import { ConsoleLogger } from '@mojaloop/logging-bc-logging-client-lib'
import { IMessage } from '@mojaloop/platform-shared-lib-messaging-types-lib'

import { MLKafkaConsumer, MLKafkaConsumerOptions, MLKafkaConsumerOutputType } from './rdkafka_consumer'
import * as RDKafka from 'node-rdkafka'

const topicNames = ['TestTopic']
const logger: ConsoleLogger = new ConsoleLogger()
let client: MLKafkaConsumer
let consumerOptions: MLKafkaConsumerOptions

async function handler (message: IMessage): Promise<void> {
  logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`)
  return await Promise.resolve()
}

async function start () {
  consumerOptions = {
    kafkaBrokerList: 'localhost:9092',
    kafkaGroupId: 'unitTests_consumer_1' + Date.now().toLocaleString(),
    useSyncCommit: false,
    // TODO add commit interval for sync=true
    outputType: MLKafkaConsumerOutputType.Json
  }

  client = new MLKafkaConsumer(consumerOptions, logger)

  client.setCallbackFn(handler)
  client.setTopics(topicNames)

  await client.connect()
  console.log('connect done')

  await client.start()
  console.log('start done')
}

setTimeout(async function () {
  await start()

  // setTimeout(() => {
  //     client.stop();
  //
  //     setTimeout(() => {
  //         client.start();
  //     }, 1000*10 );
  //
  // }, 1000*10 );
  //
  // // wait for a large time indefinetly
  // setTimeout(() => {
  //     console.log("complete");
  // }, 1 << 30);
}, 0)

process.on('SIGINT', () => {
  client.destroy(true).then(process.exit(1))
})
