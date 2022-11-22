# Mojaloop vNext - Platform Shared Libraries - Public Messages Library

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/platform-shared-lib.svg?style=flat)](https://github.com/mojaloop/platform-shared-lib/commits/master)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/platform-shared-lib-public-messages-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib-public-messages-lib)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/platform-shared-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/platform-shared-lib)
[![CircleCI](https://circleci.com/gh/mojaloop/platform-shared-lib.svg?style=svg)](https://circleci.com/gh/mojaloop/platform-shared-lib)

EXPERIMENTAL vNext Platform - Public message libs, for all publicly avaliable domain messages

Use the following command to turn a Kafka-Console output into something that is useable by KafkaCat:

```bash
cat ./test/messages.json | jq 'flatten[]' -c -M > ./test/mess.jsonl
cat ./test/messages.json | jq '.[].value' -c -M > ./test/mess1.jsonl
```

Use the following command to produce the resulting jsonl file:

```bash
kcat -b localhost:9092 -t ttksim2-topic-sdk-outbound-domain-events -T -P -l ./test/mess.jsonl
```

kcat -b localhost:9092 -t ttksim1-topic-sdk-outbound-domain-events -T -P -l ./test/mess.jsonl

❯ kcat -b localhost:9092 -t ttksim2-topic-sdk-outbound-domain-events -T -P  -l -T -K~ ./test/mess2.jsonl

(.*)transferId":"([\w-]+)"(.*)
$2~$1transferId":"$2"$3

## Refereces

- https://github.com/Blizzard/node-rdkafka/blob/master/lib/kafka-consumer.js#L382
- https://github.com/Blizzard/node-rdkafka/issues/877