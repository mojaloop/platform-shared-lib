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

"use strict";



import {ServiceBase} from "../src";
import {ILogger, LogLevel} from "@mojaloop/logging-bc-public-types-lib";
import {IConfigurationClient} from "@mojaloop/platform-configuration-bc-public-types-lib";
import process from "process";
import {KafkaLogger} from "@mojaloop/logging-bc-client-lib";
import {MLKafkaJsonProducerOptions} from "@mojaloop/platform-shared-lib-nodejs-kafka-client-lib";


const BC_NAME = "test-bc";
const APP_NAME = "testapp-svc";
const APP_VERSION = "0.0.1";
const KAFKA_URL = process.env["KAFKA_URL"] || "localhost:9092";
const KAFKA_LOGS_TOPIC = process.env["KAFKA_LOGS_TOPIC"] || "logs";
const LOG_LEVEL: LogLevel = (process.env["LOG_LEVEL"] as LogLevel) || LogLevel.DEBUG;

const kafkaProducerOptions: MLKafkaJsonProducerOptions = {
    kafkaBrokerList: KAFKA_URL,
};

const SERVICE_START_TIMEOUT_MS = process.env["SERVICE_START_TIMEOUT_MS"] && parseInt(process.env["SERVICE_START_TIMEOUT_MS"]) || 30_000;
const SVC_DEFAULT_HTTP_PORT = process.env["SVC_DEFAULT_HTTP_PORT"] && parseInt(process.env["SVC_DEFAULT_HTTP_PORT"]) || 15000;


class Service extends ServiceBase{
    constructor() {
        super(SVC_DEFAULT_HTTP_PORT, SERVICE_START_TIMEOUT_MS);
    }

    async init(
        configClient?: IConfigurationClient,
        logger?: ILogger
    ): Promise<void> {
        if (!logger) {
            logger = new KafkaLogger(
                BC_NAME,
                APP_NAME,
                APP_VERSION,
                kafkaProducerOptions,
                KAFKA_LOGS_TOPIC,
                LOG_LEVEL
            );
            await (logger as KafkaLogger).init();
        }
        return super.init(configClient, logger);

    }

    customStart(name:string): Promise<void> {
        return Promise.resolve(undefined);
    }

}

void async function main(){
    const service = new Service();
    await service.init();
    await service.start();
}
