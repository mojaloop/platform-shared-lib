/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list (alphabetical ordering) of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Crosslake
 - Pedro Sousa Barreto <pedrob@crosslaketech.com>

 --------------
 ******/

"use strict"

import util from 'util'
import { DefaultLogger } from '@mojaloop/logging-bc-client-lib';
import { ILogger, LogLevel } from '@mojaloop/logging-bc-public-types-lib';
import { IMessage } from '@mojaloop/platform-shared-lib-messaging-types-lib';
import { IRawMessage, IRawMessageConsumer, IRawConsumeEofEvent, MLKafkaRawStreamConsumer, MLKafkaRawStreamConsumerOptions, MLKafkaRawConsumer, MLKafkaRawConsumerOptions} from '@mojaloop/platform-shared-lib-nodejs-kafka-client-lib';

const app = async () => {

  let isProcessing = false;
  let starTime: [number, number];
  let endTime: [number, number];
  const listOfLatency: number[] = [];

  // Instantiate logger
  // const logger: ILogger = new DefaultLogger('test-nodejs-kafka-client-lib', 'test', '0.0.1', LogLevel.TRACE);
  const logger: ILogger = new DefaultLogger('test-nodejs-kafka-client-lib', 'test', '0.0.1', LogLevel.DEBUG);
  

  const calculateLatency = () => {
    endTime = process.hrtime(starTime);
    const latency = (endTime[0] * 1e9 + endTime[1]) / 1e6; // convert first to ns then to ms
    listOfLatency.push(latency);
    const average = listOfLatency.reduce((prev, curr, index, arr) => {
      return prev + curr
    }) / listOfLatency.length
    return {
      latency,
      average,
      runs: listOfLatency.length
    }
  }

  const handleEoF = async (event: IRawConsumeEofEvent) => {
    logger.info(`event=${util.inspect(event)}`)
  }

  // lets clean up all consumers here
  /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
  const killProcess = async (): Promise<void> => {
    logger.info('Exiting process...');

    // if (starTime && endTime) logger.info(`elapsedTime=${calculateLatency()}`)

    await consumer.destroy(false);

    logger.info('Exit complete!');
    process.exit(0);
  };

  /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
  process.on('SIGINT', killProcess);

  const consumerRawStreamOpts: MLKafkaRawStreamConsumerOptions = {
    kafkaBrokerList: 'localhost:9092',
    kafkaGroupId: 'test',
    topics: [ 
      'ttksim2-topic-sdk-outbound-domain-events'
    ],
  }

  const consumerRawOpts: MLKafkaRawConsumerOptions = {
    kafkaBrokerList: 'localhost:9092',
    kafkaGroupId: 'test',
    consumeMessageNum: 10, // comment this out for flow mode
    processInOrder: true, // process message in order?
  }

  // const consumer: IRawMessageConsumer = new MLKafkaRawStreamConsumer(consumerRawStreamOpts, logger)
  const consumer: IRawMessageConsumer = new MLKafkaRawConsumer(consumerRawOpts, logger)

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handler: (message: IRawMessage) => Promise<void> = async (message) => {
    if (isProcessing) {
      logger.warn(`PROCESSING OVERLAP!!!!!!! isProcessing=${isProcessing}`);
      endTime = process.hrtime();
      await killProcess();
    } else {
      starTime = process.hrtime();
    }
    isProcessing = true;
    logger.info(`PROCESSING message=${util.inspect(message)}`);

    // const sleepInMs = 1000
    // logger.warn(`SLEEPING FOR ${sleepInMs}ms`);
    // await sleep(sleepInMs)

    if (message.key === "3d4d97d5-9cb1-4893-803e-999999999999") {
      logger.warn('END KEY FOUND - WE ARE CLOSING STREAM!');
      endTime = process.hrtime();
      // await killProcess();
      if (starTime && endTime) { 
        const calcs = calculateLatency()
        logger.warn(`latency: ${calcs.latency}ms`)
        logger.warn(`average: ${calcs.average}ms`)
        logger.warn(`runs: ${calcs.runs}`)
      }
    }
    isProcessing = false;
    return
  }

  consumer.setEndOfPartitionFn(handleEoF);
  consumer.setCallbackFn(handler);
  consumer.setTopics(consumerRawStreamOpts.topics)
  await consumer.connect();
  await consumer.start();

}

app();
