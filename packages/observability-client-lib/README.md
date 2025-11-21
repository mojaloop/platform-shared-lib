# Mojaloop vNext - Platform Shared Libraries - Observability Client Library

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/platform-shared-lib.svg?style=flat)](https://github.com/mojaloop/platform-shared-lib/commits/master)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/platform-shared-lib-observability-client-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-public-metrics-lib)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/platform-shared-lib-observability-client-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-observability-client-lib)
[![CircleCI](https://circleci.com/gh/mojaloop/platform-shared-lib.svg?style=svg)](https://circleci.com/gh/mojaloop/platform-shared-lib)

EXPERIMENTAL vNext Platform - Observability client lib, implementation for prometheus metrics and other health checks

> **⚠️ IMPORTANT STATUS NOTE:**
>
> **This package is currently not used within the platform-shared-lib monorepo and has outdated dependencies dating back to 2021.**
>
> - **Tests are currently skipped** due to TypeScript compilation errors caused by incompatible OpenTelemetry package versions
> - **Coverage thresholds are set to 0** in jest.config.js
> - The package uses OpenTelemetry packages version ~0.24.0 to ~0.51.0 which have breaking API changes with current versions
> - **Compilation errors** in `src/tracing.ts` prevent the package from building successfully
>
> This package is only published for potential external consumption but requires significant dependency updates before it can be properly maintained.

**Note:** This library HAS specific implementation details and dependencies and **CANNOT be included in domain code**. In domain code, please use the interfaces published in `@mojaloop/platform-shared-lib-observability-types-lib` 

