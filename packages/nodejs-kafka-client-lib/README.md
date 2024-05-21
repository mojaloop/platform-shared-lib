# Mojaloop vNext - Platform Shared Libraries - Node.js Kafka Client Lib

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/platform-shared-lib.svg?style=flat)](https://github.com/mojaloop/platform-shared-lib/commits/master)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/platform-shared-lib-nodejs-kafka-client-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-nodejs-kafka-client-lib)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/platform-shared-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib)
[![CircleCI](https://circleci.com/gh/mojaloop/platform-shared-lib.svg?style=svg)](https://circleci.com/gh/mojaloop/platform-shared-lib)

This is the kafka library implementation of the general messaging consumer and publisher interfaces found in [here](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-messaging-types-lib)

It includes two a set of producer and consumer classes:
- **RAW or low-level message consumer and producer implementations** - this is a wrapper around node-rdkafka lib to that makes most of its features available, its consumer can be configured to parse output messages as JSON objects, strings of leave it as the original binary format
- **JSON or high-level message consumer and producer implementations** - simpler to use with the consumer automatically parsing messages to JSON (makes use of the raw implementation)

# Note on dependening/using this library
Never use these classes as a direct dependency from pure domain code, instead, use the generic types and interfaces provided by `"@mojaloop/platform-shared-lib-messaging-types-lib"` which as implemented by the classes of this lib.

Only application layer implementations should use these classes directly (or tests).

## Usage

### JSON Consumer example

```typescript
import {ConsoleLogger} from "@mojaloop/logging-bc-public-types-lib";
import {IMessage, MessageTypes} from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {MLKafkaJsonConsumer, MLKafkaJsonConsumerOptions} from "@mojaloop/platform-shared-lib-nodejs-kafka-client-lib";

const logger: ConsoleLogger = new ConsoleLogger();

const authOptions:  IRawAuthenticationOptions = {
    mechanism: "SCRAM-SHA-256",
    username: "kafka",
    password: "password"
}

const consumerOptions: MLKafkaJsonConsumerOptions = {
    kafkaBrokerList: "localhost:9092",
    kafkaGroupId: "test_consumer_group",
    // optional authentication
    authentication: authOptions
};

const kafkaConsumer: MLKafkaJsonConsumer = new MLKafkaJsonConsumer(consumerOptions, logger);

async function handler(message: IMessage): Promise<void> {
    logger.debug(`Got message in handler: ${JSON.stringify(message, null, 2)}`);
    return;
}

kafkaConsumer.setCallbackFn(handler);
kafkaConsumer.setTopics(["myTopic"]);
await kafkaConsumer.connect();

// Start consuming to handler - waiting for the consumer to be fully rebalanced before proceeding
await kafkaConsumer.startAndWaitForRebalance();

// OPTIONAL - don't wait for the Consumer Group this consumer instance belongs to be rebalanced
// await kafkaConsumer.start();

// NOTE make sure destroy is always called when a consumer exists, to quickly inform the Kafka cluster,
// so it can rebalance the consumer group as soon as possible (without waiting for a timeout)
setTimeout(async ()=>{
    await kafkaConsumer.destroy(false);
}, 1000);
```

### Producer example

```typescript
import {ConsoleLogger} from "@mojaloop/logging-bc-public-types-lib";
import {IMessage, MessageTypes} from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {MLKafkaJsonProducer, MLKafkaJsonProducerOptions} from "@mojaloop/platform-shared-lib-nodejs-kafka-client-lib";

const logger: ConsoleLogger = new ConsoleLogger();

const authOptions:  IRawAuthenticationOptions = {
    mechanism: "SCRAM-SHA-256",
    username: "kafka",
    password: "password"
}

const producerOptions: MLKafkaJsonProducerOptions = {
    kafkaBrokerList: "localhost:9092",
    producerClientId: "test_producer",
    // optional authentication
    authentication: authOptions
};

const kafkaProducer: MLKafkaJsonProducer =  new MLKafkaJsonProducer(producerOptions, logger);

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

These allow publishing and consuming string or buffer messages directly without heavy JSON conversions.

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

### Raw consumer specific events

- `"ready"` - emitted as result of a successful connect and before the connect() finishes
- `"rebalance"` - emitted as result of a successful consumer group rebalance (either with type assing or revoke)
- `"rebalance.error"` - emitted as result of a unsuccessful consumer group rebalance (will include the error)
- `"disconnected"` - emitted as result of the client being disconnected from the cluster
- `"event"` | "throttle" | "stats" - technical/debug events, emitted by the rdkafka lib

### Batching
To control batching parameters of the `MLKafkaRawConsumer` tweak the following options of the `MLKafkaRawConsumerOptions` structure:

```typescript
export class MLKafkaRawConsumerOptions {
    // ... other options
    batchSize?: number;           // default: 1 - maximum number of messasges to wait for in each consume loop (if not timeout)
    batchTimeoutMs?: number;      // default: 1000 - maximum amount of time to wait for in each consume loop (if not bactch size reached)
}
```

The consumer loop will wait for any of those parameters to be true, whichever happens first.
