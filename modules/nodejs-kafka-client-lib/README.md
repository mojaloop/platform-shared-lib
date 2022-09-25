# Mojaloop vNext - Platform Shared Libraries - Node.js Kafka Client Lib

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/platform-shared-lib.svg?style=flat)](https://github.com/mojaloop/platform-shared-lib/commits/master)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/platform-shared-lib-nodejs-kafka-client-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-nodejs-kafka-client-lib)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/platform-shared-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib)
[![CircleCI](https://circleci.com/gh/mojaloop/platform-shared-lib.svg?style=svg)](https://circleci.com/gh/mojaloop/platform-shared-lib)

This is the kafka library implementation of the general messaging consumer and publisher interfaces found in [here](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-messaging-types-lib)  

It includes JSON Message Consumer and Producer implementations.  

## Usage

### JSON Consumer example

```typescript
const logger: ConsoleLogger = new ConsoleLogger();

let consumerOptions: MLKafkaJsonConsumerOptions = {
    kafkaBrokerList: "localhost:9092",
    kafkaGroupId: "test_consumer_group",
};

let kafkaConsumer: MLKafkaJsonConsumer = new MLKafkaJsonConsumer(consumerOptions, logger);

async function handler(message: IMessage): Promise<void> {
    logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`);
    return;
}

kafkaConsumer.setCallbackFn(handler);
kafkaConsumer.setTopics(["myTopic"]);
await kafkaConsumer.connect();

// Start consuming to handler
await kafkaConsumer.start();

// NOTE make sure destroy is always called when a consumer exists, to quickly inform the Kafka cluster, so it can rebalance as soon as possible
setTimeout(async ()=>{
    await kafkaConsumer.destroy(false);
}, 1000);
```

### Producer example

```typescript
const logger: ConsoleLogger = new ConsoleLogger();

let producerOptions: MLKafkaJsonProducerOptions = {
    kafkaBrokerList: "localhost:9092",
    producerClientId: "test_producer"
};

let kafkaProducer: MLKafkaJsonProducer =  new MLKafkaJsonProducer(producerOptions, logger);

// example to get delivery reports
kafkaProducer.setDeliveryReportFn((topic: string, partition: number, offset: number) => {
    console.log(`Delivery report event - topic: ${topic}, partition: ${partition}, offset: ${offset}`);
    return;
});

// Set handler to null to disable
// kafkaProducer.setDeliveryReportFn(null);

await kafkaProducer.connect();

const msg:IMessage = {
    msgId: "msgId",
    msgName: "msgName",
    msgKey: "msgKey",
    msgType: MessageTypes.DOMAIN_EVENT,
    msgTimestamp: Date.now(),
    msgPartition: 42,
    msgOffset: 31415,
    msgTopic: "myTopic",
    payload: {
        testProp: "propValue"
    }
};

await kafkaProducer.send(msg);  //Note: send() can also receiver an array of messages


// NOTE make sure destroy is always called when finished
setTimeout(async ()=>{
    await kafkaProducer.destroy()
}, 1000)
```

## Raw / Low-level message consumer and producer implementations

This lib also provides implementations for a low-level message consumer and a low-level producer.
These allow publishing and consuming string or buffer messages directly without heavy JSON convertions.

They don't implement the generic interfaces that domain can use, so, these should only be used as base for higher level implementations.

Both `MLKafkaJsonConsumer` and `MLKafkaJsonProducer` wrap these low-level implementations.

### Raw message types
```typescript
export interface IRawMessageHeader {
  [key: string]: string | Buffer;
}

export interface IRawMessage {
  value: Buffer | string | object | null;
  topic: string;
  key: Buffer | string | null;
  timestamp: number | null;
  headers: IRawMessageHeader[] | null;

  partition: number | null;
  offset: number | null;
}

export interface IRawMessageConsumer {
  setCallbackFn: (handlerCallback: (message: IRawMessage) => Promise<void>) => void;
  setTopics: (topics: string[]) => void;

  destroy: (force: boolean) => Promise<void>;

  connect: () => Promise<void>;
  disconnect: (force: boolean) => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export declare interface IRawMessageProducer {
  destroy: () => Promise<void>;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

  send: (message: IRawMessage | IRawMessage[] | any) => Promise<void>;
}
```

### Raw consumer and producer classes
- `MLKafkaRawConsumer`
- `MLKafkaRawProducer`

