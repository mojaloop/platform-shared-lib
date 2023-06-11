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

/* eslint-disable @typescript-eslint/no-explicit-any */

import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {IMessageConsumer, IMessage} from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {EventEmitter} from "events";
import {
    MLKafkaRawConsumer,
    MLKafkaRawConsumerOutputType,
    MLKafkaRawConsumerOptions
} from "./raw/rdkafka_raw_consumer";
import {IRawMessage} from "./raw/raw_types";


type MLKafkaJsonConsumerEvents = "rebalance";
type MLKafkaJsonConsumerEventListenerMap = {
    "rebalance": (type: "assign" | "revoke", assignments: { topic: string, partition: number }[]) => void;
}
type MLKafkaJsonConsumerEventListener<K extends string> = K extends keyof MLKafkaJsonConsumerEventListenerMap ? MLKafkaJsonConsumerEventListenerMap[K]:never;


export class MLKafkaJsonConsumerOptions {
    kafkaBrokerList: string
    kafkaGroupId?: string
    useSyncCommit?: boolean
    autoOffsetReset?: "earliest" | "latest" | "error" // default is latest
    sessionTimeoutMs?: number;   //Client group session and failure detection timeout, default is 45 secs
    batchSize?: number;
    batchTimeoutMs?: number;
}

export class MLKafkaJsonConsumer extends EventEmitter implements IMessageConsumer {
    private readonly _logger: ILogger | null;
    private readonly _kafkaRawConsumer: MLKafkaRawConsumer;
    private _handlerCallback: ((message: IMessage) => Promise<void>) | null = null;
    private _batchHandlerCallback: ((messages: IMessage[]) => Promise<void>) | null = null;
    private _filterFn: (message: IMessage) => boolean
    private _options: MLKafkaJsonConsumerOptions

    constructor(options: MLKafkaJsonConsumerOptions, logger: ILogger | null = null) {
        super();
        this._options = options;
        this._logger = logger;

        const rawOptions: MLKafkaRawConsumerOptions = {
            ...options,
            outputType: MLKafkaRawConsumerOutputType.Json
        };

        this._kafkaRawConsumer = new MLKafkaRawConsumer(rawOptions, logger);

        if (this._options.batchSize && this._options.batchSize > 1) {
            this._kafkaRawConsumer.setBatchCallbackFn(this._internalBatchHandler.bind(this));
        } else {
            this._kafkaRawConsumer.setCallbackFn(this._internalHandler.bind(this));
        }

        this._kafkaRawConsumer.eventNames()

        // hook MLKafkaRawConsumer events we care about
        this._kafkaRawConsumer.on("rebalance", (type: "assign" | "revoke", assignments: { topic: string; partition: number }[]) => {
            this.emit("rebalance", type, assignments);
        });

        this._logger?.isInfoEnabled() && this._logger.info("MLKafkaJsonConsumer - instance created");
    }

    on(event: MLKafkaJsonConsumerEvents, listener: MLKafkaJsonConsumerEventListener<MLKafkaJsonConsumerEvents>): this {
        return super.on(event, listener);
    }

    once(event: MLKafkaJsonConsumerEvents, listener: MLKafkaJsonConsumerEventListener<MLKafkaJsonConsumerEvents>): this {
        return super.once(event, listener);
    }

    private _convertMsg(message: IRawMessage): IMessage{
        const valueObj = message.value as IMessage;
        valueObj.msgPartition = message.partition;
        valueObj.msgOffset = message.offset;
        valueObj.msgTopic = message.topic;

        // TODO convert the headers (at least the known ones)
        return valueObj;
    }

    private async _internalHandler(rawMessage: IRawMessage): Promise<void> {
        if(!this._handlerCallback) return;

        // convert raw message to IMessage
        const msg = this._convertMsg(rawMessage);

        if (this._filterFn && !this._filterFn(msg)) {
            this._logger?.isDebugEnabled() && this._logger.debug("MLKafkaConsumer - ignoring message filtered out by filterFunction");
            return; // this will commit in the base
        }

        await this._handlerCallback(msg);
    }

    private async _internalBatchHandler(rawMessages: IRawMessage[]): Promise<void> {
        if(!this._batchHandlerCallback) return;

        // convert raw message to IMessage and filter
        const msgs:IMessage[] = [];
        rawMessages.forEach(rawMsg =>{
            const msg = this._convertMsg(rawMsg);
            if (this._filterFn && !this._filterFn(msg)) {
                this._logger?.isDebugEnabled() && this._logger.debug("MLKafkaConsumer - ignoring message filtered out by filterFunction");
            }else{
                msgs.push(msg);
            }
        });

        await this._batchHandlerCallback(msgs);
    }

    setCallbackFn(handlerCallback: (message: IMessage) => Promise<void>): void {
        this._batchHandlerCallback = null;
        this._handlerCallback = handlerCallback;
    }

    setBatchCallbackFn(batchHandlerCallback: (messages: IMessage[]) => Promise<void>): void{
        this._handlerCallback = null;
        this._batchHandlerCallback = batchHandlerCallback;
    }

    setFilteringFn(filterFn: (message: IMessage) => boolean): void {
        this._filterFn = filterFn;
    }

    setTopics(topics: string[]): void {
        this._kafkaRawConsumer.setTopics(topics);
    }

    setBatchSize(size: number):void{
        this._kafkaRawConsumer.setBatchSize(size);
    }

    async destroy(force: boolean): Promise<void> {
        return this._kafkaRawConsumer.destroy(force);
    }

    async connect(): Promise<void> {
        return this._kafkaRawConsumer.connect();
    }

    async disconnect(): Promise<void> {
        return this._kafkaRawConsumer.disconnect();
    }

    start(): Promise<void> {
        return this._kafkaRawConsumer.start();
    }

    startAndWaitForRebalance(): Promise<void> {
        return this._kafkaRawConsumer.startAndWaitForRebalance();
    }

    async stop(): Promise<void> {
        return this._kafkaRawConsumer.stop();
    }
}
