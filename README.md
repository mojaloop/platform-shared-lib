# Mojaloop vNext - Platform Shared Libraries

**EXPERIMENTAL** vNext Platform Shared Lib Bounded Context Mono Repository

## Packages / Libraries included

- [messaging-types-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/messaging-types-lib) - Generic Messaging Types Library for the vNext Mojaloop platform.
- [nodejs-kafka-client-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/nodejs-kafka-client-lib) - Kafka library implementation of the general messaging consumer and publisher interfaces.

## Usage

See per package documentation above

### Install Node version

More information on how to install NVM: https://github.com/nvm-sh/nvm

```bash
nvm install
nvm use
```

### Install Dependencies

```bash
npm install
```

## Build

```bash
npm run build
```

## Unit Tests

```bash
npm run test:unit
```

## Integration Tests

```bash
npm run test:integration
```
