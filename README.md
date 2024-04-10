# Mojaloop vNext - Platform Shared Libraries

**EXPERIMENTAL** vNext Platform Shared Lib Bounded Context Mono Repository

Platform-shared-lib is one of the repositories within the Mojaloop vNext ecosystem, designed to address various shared needs  beyond business functionalities and cross-cutting concerns such as common libraries, user interfaces, scripts, tooling and documentation.. 
This repository includes  includes other common platform libs that don't fit in any BC.

## Contents
- [platform-shared-lib](#mojaloop-vnext---platform-shared-libraries)
  - [Contents](#contents)
  - [Packages](#packages--libraries-included)
  - [Usages](#usage)
  - [Auditing Dependencies](#auditing-dependencies)
  - [CI/CD](#cicd-pipelines)

## Packages / Libraries included

- [messaging-types-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/messaging-types-lib) - Generic Messaging Types Library for the vNext Mojaloop platform.
- [nodejs-kafka-client-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/nodejs-kafka-client-lib) - Kafka library implementation of the general messaging consumer and publisher interfaces.
- [observability-client-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/messaging-types-lib) - Observability client lib, implementation for prometheus metrics and other health checks
- [observability-types-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/nodejs-kafka-client-lib) - Public observability types lib, for all publicly available observability types, includes metrics and health checks.
- [public-messages-lib](https://github.com/mojaloop/platform-shared-lib/tree/main/packages/messaging-types-lib) - Public message libs, for all publicly avaliable domain messages.


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

## Auditing Dependencies
We use npm audit to check dependencies for node vulnerabilities. 

To start a new resolution process, run:

```
npm run audit:fix
``` 

You can check to see if the CI will pass based on the current dependencies with:

```
npm run audit:check
```

## CI/CD Pipelines

### Execute locally the pre-commit checks - these will be executed with every commit and in the default CI/CD pipeline 

Make sure these pass before committing any code
```
npm run pre_commit_check
```

### Work Flow 

 As part of our CI/CD process, we use CircleCI. The CircleCI workflow automates the process of publishing changed packages to the npm registry and building Docker images for select packages before publishing them to DockerHub. It also handles versioning, tagging commits, and pushing changes back to the repository.

The process includes five phases. 
1. Setup : This phase initializes the environment, loads common functions, and retrieves commits and git change history since the last successful CI build.

2. Detecting Changed Package.

3. Publishing Changed Packages to NPM.

4. Building Docker Images and Publishing to DockerHub.

5. Pushing Commits to Git.

 All code is automatically linted, built, and unit tested by CircleCI pipelines, where unit test results are kept for all runs. All libraries are automatically published to npm.js, and all Docker images are published to Docker Hub.