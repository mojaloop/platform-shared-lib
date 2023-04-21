# Mojaloop vNext - Platform Shared Libraries - Messaging Types Library

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/platform-shared-lib.svg?style=flat)](https://github.com/mojaloop/platform-shared-lib/commits/master)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/platform-shared-lib-messaging-types-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-messaging-types-lib)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/platform-shared-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib)
[![CircleCI](https://circleci.com/gh/mojaloop/platform-shared-lib.svg?style=svg)](https://circleci.com/gh/mojaloop/platform-shared-lib)

Generic Messaging Types Library for the vNext Mojaloop platform. 
These types are meant to be stable, thus can be used in domain code.
Note: for domain usage, actual implementations should be dependency-injected from outside the domain. 

## Generic Message Types

```Typescript
export enum MessageTypes{
    'STATE_EVENT' =0,           // for private event-sourcing events
    'STATE_SNAPSHOT',           // for private event-sourcing snapshot events
    'DOMAIN_EVENT',             // public domain events
    'COMMAND',                  // for internal/private BC commands
}

export interface IMessage{
    msgType: MessageTypes;
    msgName: string;             // name of the event or command
    msgId: string;               // unique per message
    msgTimestamp: number;
    msgTopic: string;
    msgKey: string | null;       // usually the id of the aggregate (used for partitioning)
    msgPartition: number | null;
    msgOffset: number | null;

    payload: any;                // this the actual message payload, specific to each type of msg
}
```

## Base Domain Message Types (including aggregate identification)

```Typescript
export interface IDomainMessage extends IMessage{
    aggregateName: string       // name of the source/target aggregate (source if event, target if command)
    aggregateId: string         // id of the source/target aggregate (source if event, target if command)
}

export abstract class DomainMsg implements IDomainMessage {
    msgId: string = Crypto.randomUUID();
    msgTimestamp: number = Date.now();
    msgName: string = (this as any).constructor.name;
    msgPartition: number | null = null;
    msgOffset: number | null;

    abstract msgType: MessageTypes;
    abstract msgKey: string;
    abstract msgTopic: string;

    abstract aggregateId: string;
    abstract aggregateName: string;

    abstract payload: any
}
```

## Specific Domain Message Types to extend from

### General Domain events 
Domain code emits these to advertise the facts that somehting itneresting happened inside that domain, and other apps might be interested int 

**These are usually public**, any code inside the platform can listen to these
```Typescript
export abstract class DomainEventMsg extends DomainMsg {
    msgType: MessageTypes = MessageTypes.DOMAIN_EVENT;
}
```

### State events to be used in event-sourcing scenarios

**These are usually private** to the publishing BCs/applications - no other apps should be allowed to listen them (exception is in CQRS pattern where an event handler of the same BC is creating a query data store from these events)

```Typescript
export abstract class StateEventMsg extends DomainMsg {
    msgType: MessageTypes = MessageTypes.STATE_EVENT;
}
```

### Command messages events to be used in event-sourcing scenarios
**These are usually private** to the publishing BCs/applications - no other apps should be allowed to listen them (exception is in CQRS pattern where an event handler of the same BC is creating a query data store from these events)

```Typescript
export abstract class CommandMsg extends DomainMsg {
    msgType: MessageTypes = MessageTypes.COMMAND;
}
```

## Message Consumer and Publisher interfaces

These interfaces provide an abstraction layer over specific infrastructure implementation, facilitating mocks and a future change from Kafka (if beneficial/necessary). 
They are stable and can be used in Domain Code, provided the domain code only depends on this lib and not actual implementation libs.  

All implementation of message consumers and producer intended for general use must implement these interfaces.

In this repo we provide the implementation for Kafka [here](https://github.com/mojaloop/platform-shared-lib/tree/main/modules/nodejs-kafka-client-lib) - Its npm [module](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-nodejs-kafka-client-lib)

### IMessageConsumer
```Typescript
export interface IMessageConsumer {
    setCallbackFn: (handlerCallback: (message: IMessage) => Promise<void>) => void
    setFilteringFn: (filterFn: (message: IMessage) => boolean) => void
    setTopics: (topics: string[]) => void
    
    destroy: (force: boolean) => Promise<void>
    
    connect: () => Promise<void>
    disconnect: (force: boolean) => Promise<void>
    start: () => Promise<void>
    stop: () => Promise<void>
}
```

### IMessageProducer
```Typescript
export declare interface IMessageProducer {
    destroy: () => Promise<void>

    connect: () => Promise<void>
    disconnect: () => Promise<void>

    send: (message: IMessage | IMessage[]) => Promise<void>
}
```
