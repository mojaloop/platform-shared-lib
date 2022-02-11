# platform-shared-lib-nodejs-kafka-client-lib

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/logging-bc.svg?style=flat)](https://github.com/mojaloop/logging-bc/commits/master)
[![Git Releases](https://img.shields.io/github/release/mojaloop/logging-bc.svg?style=flat)](https://github.com/mojaloop/logging-bc/releases)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop-poc/logging-bc.svg?style=flat)](https://www.npmjs.com/package/@mojaloop-poc/logging-bc)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/logging-bc.svg?style=flat)](https://www.npmjs.com/package/@mojaloop-poc/logging-bc)
[![CircleCI](https://circleci.com/gh/mojaloop/logging-bc.svg?style=svg)](https://circleci.com/gh/mojaloop/logging-bc)

Mojaloop Platform Shared Libraries - Node.js Kafka Client Lib

## Usage

###Consumer example

```typescript
const logger: ConsoleLogger = new ConsoleLogger()

let consumerOptions: MLKafkaConsumerOptions = {
    kafkaBrokerList: 'localhost:9092',
    kafkaGroupId: 'test_consumer_group_'+Date.now(),
    outputType: MLKafkaConsumerOutputType.Json
}

let kafkaConsumer: MLKafkaConsumer = new MLKafkaConsumer(consumerOptions, logger)

async function handler(message: IMessage): Promise<void> {
    logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`)
    return
}

kafkaConsumer.setCallbackFn(handler)
kafkaConsumer.setTopics(['myTopic'])
await kafkaConsumer.connect()

// Start consuming to handler
await kafkaConsumer.start()

// NOTE make sure destroy is always called when finished
setTimeout(async ()=>{
    await kafkaConsumer.destroy(false)
}, 10000)
```

###Producer example

```typescript
const logger: ConsoleLogger = new ConsoleLogger()

let producerOptions: MLKafkaProducerOptions = {
    kafkaBrokerList: 'localhost:9092',
    producerClientId: 'test_producer'
}
let kafkaProducer: MLKafkaProducer =  new MLKafkaProducer(producerOptions, logger)

// example to get delivery reports
kafkaProducer.on('deliveryReport', (topic: string, partition: number|null, offset: number|null) => {
    console.log(`delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`)
    return;
})

await kafkaProducer.connect()

const msgs = []
for (let i = 0; i < messageCount; i++) {
    msgs.push({
        topic: 'myTopic',
        value: { testProp: i },
        key: null,
        headers: [
            { key1: 'testStr' }
        ]
    })
}

await kafkaProducer.send(msgs)

// NOTE make sure destroy is always called when finished
setTimeout(async ()=>{
    await kafkaProducer.destroy()
}, 10000)
```



### Install Node version

More information on how to install NVM: https://github.com/nvm-sh/nvm

```bash
nvm install
nvm use
```

### Install Yarn

```bash
npm -g yarn
```

### Install Dependencies

```bash
yarn
```

## Build

```bash
yarn build
```

## Run

```bash
yarn start
```

## Unit Tests

```bash
yarn test:unit
```

## Known Issues

- added `typescript` to [.ncurc.json](./.ncurc.json) as the `dep:update` script will install a non-supported version of typescript
