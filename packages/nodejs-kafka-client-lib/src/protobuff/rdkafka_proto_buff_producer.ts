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

import { ILogger } from "@mojaloop/logging-bc-public-types-lib";
import { IMessage, IMessageProducer } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {MLKafkaRawProducer, MLKafkaRawProducerOptions} from "../raw/rdkafka_raw_producer";
import {IRawMessage} from "../raw/raw_types";

export type MLKafkaProtoBuffProducerOptions = MLKafkaRawProducerOptions;

export class MLKafkaProtoBuffProducer implements IMessageProducer {
    private readonly _logger: ILogger | null;
    private readonly _rawKafkaProducer:MLKafkaRawProducer;

    constructor (options: MLKafkaProtoBuffProducerOptions, logger: ILogger | null = null) {
      this._logger = logger;

      this._rawKafkaProducer = new MLKafkaRawProducer(options, logger);

      this._logger?.isInfoEnabled() && this._logger.info("MLKafkaProtoBuffProducer - instance created");
    }

    private _convert(message: IMessage | IMessage[]):IRawMessage[]{
        const outpuMsgs: IRawMessage[] = [];

        const inputMsgs: IMessage[] = Array.isArray(message) ? [...message] : [message];

        for(const msg of inputMsgs){
            outpuMsgs.push({
                topic: msg.msgTopic,
                key: msg.msgKey,
                timestamp: msg.msgTimestamp,
                headers: [],
                value: msg,
                offset: null,
                partition: msg.msgPartition || null
            });

            // TODO: parse headers
        }

        return outpuMsgs;
    }

    async send (message: IMessage | IMessage[]): Promise<void> {
        // TODO fill in missing fields with defaults (id, timestamp, etc)

        const rawMsg: IRawMessage[] = this._convert(message);
        return this._rawKafkaProducer.send(rawMsg);

    }

    async disconnect (): Promise<void> {
        return this._rawKafkaProducer.disconnect();
    }

    async connect (): Promise<void> {
        return this._rawKafkaProducer.connect();
    }

    setDeliveryReportFn(handlerCallback: null | ((topic:string, partition:number, offset:number) => void)): void {
        this._rawKafkaProducer.setDeliveryReportFn(handlerCallback);
    }

    async destroy (): Promise<void> {
      return this._rawKafkaProducer.destroy();
    }
}
