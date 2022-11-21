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

import Util from "util";
import * as RDKafka from "node-rdkafka";
import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {IRawConsumeEofEvent, IRawMessage, IRawMessageConsumer} from "./raw_types";

export enum MLKafkaRawStreamConsumerOutputType {
    Raw,
    String,
    Json
}

const defaultOptions = {
    useSyncCommit: false,
    outputType: MLKafkaRawStreamConsumerOutputType.Json
}

export class MLKafkaRawStreamConsumerOptions {
    kafkaBrokerList: string
    kafkaGroupId?: string
    consumerClientId?: string
    useSyncCommit?: boolean
    outputType?: MLKafkaRawStreamConsumerOutputType
    autoOffsetReset?: "earliest" | "latest" | "error" // default is latest
    messageMaxBytes?: number
    topics: string[]
}

export class MLKafkaRawStreamConsumer implements IRawMessageConsumer {
    private readonly _logger: ILogger | null
    private _options: MLKafkaRawStreamConsumerOptions
    private _globalConfig: RDKafka.ConsumerGlobalConfig
    private _topicConfig: RDKafka.ConsumerTopicConfig
    private _topics: string[]
    private readonly _client: RDKafka.KafkaConsumer
    private readonly _stream: RDKafka.ConsumerStream
    private _handlerCallback: (message: IRawMessage) => Promise<void>
    private _endOfPartitionFn: (event: IRawConsumeEofEvent) => Promise<void>

    constructor(options: MLKafkaRawStreamConsumerOptions, logger: ILogger | null = null) {
        this._options = options;
        this._logger = logger;

        // parse options and apply defaults
        this._parseOptionsAndApplyDefault();

        this._stream = RDKafka.KafkaConsumer.createReadStream(this._globalConfig, this._topicConfig, {
            topics: this._topics
        });

        // this._client = new RDKafka.KafkaConsumer(this._globalConfig, this._topicConfig);
        this._client = this._stream.consumer;

        this._client.on("ready", this._onReady.bind(this));
        this._client.on("event.log", this._onLog.bind(this));
        this._client.on("event.error", this._onError.bind(this));
        this._client.on("event.throttle", this._onThrottle.bind(this));
        this._client.on("event.stats", this._onStats.bind(this));
        this._client.on("disconnected", this._onDisconnect.bind(this));
        this._client.on("data", this._onData.bind(this));
        this._client.on("partition.eof", this._onPartitionEoF.bind(this));

        this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - instance created");
        this._logger?.isInfoEnabled() && this._logger.info(`MLRawStreamKafkaConsumer - features: ${RDKafka.features.toString()}`);
    }

    private _parseOptionsAndApplyDefault(): void {
        this._globalConfig = {};
        this._topicConfig = {};

        if (this._options.useSyncCommit===undefined) {
            this._options.useSyncCommit = defaultOptions.useSyncCommit;
        }

        if (this._options.outputType===undefined) {
            this._options.outputType = defaultOptions.outputType;
        }

        if (this._options.autoOffsetReset===undefined) {
            this._options.autoOffsetReset = "latest";
        }

        if (this._options.consumerClientId !== undefined) {
            this._globalConfig["client.id"] = this._options.consumerClientId;
        }

        if (this._options.kafkaGroupId !== undefined) {
            this._globalConfig["group.id"] = this._options.kafkaGroupId;
        }

        if (this._options.messageMaxBytes !== undefined) {
            this._globalConfig["message.max.bytes"] = this._options.messageMaxBytes;
        }

        // topic configs
        this._topicConfig["auto.offset.reset"] = this._options.autoOffsetReset;

        // global client options
        this._globalConfig ["metadata.broker.list"] = this._options.kafkaBrokerList;

        // get topics
        this._topics = this._options.topics;

        // enabled Partition EoF
        this._globalConfig ["enable.partition.eof"] = true
    }

    private _onReady(info: RDKafka.ReadyInfo, metadata: RDKafka.Metadata): void {
        this._logger?.isInfoEnabled() && this._logger.info(`MLRawStreamKafkaConsumer - event.ready - info: ${JSON.stringify(info, null, 2)}`);
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawStreamKafkaConsumer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onError(error: RDKafka.LibrdKafkaError): void {
        this._logger?.isErrorEnabled() && this._logger.error(`MLRawStreamKafkaConsumer - event.error - ${JSON.stringify(error, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onThrottle(eventData: any): void {
        this._logger?.isWarnEnabled() && this._logger.warn(`MLRawStreamKafkaConsumer - event.throttle - ${JSON.stringify(eventData, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onLog(eventData: any): void {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawStreamKafkaConsumer - event.log - ${JSON.stringify(eventData, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onStats(eventData: any): void {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawStreamKafkaConsumer - event.stats - ${eventData.message}`);
    }

    private _onDisconnect(metrics: RDKafka.ClientMetrics): void {
        /* istanbul ignore else */
        if (metrics?.connectionOpened) {
            this._logger?.isInfoEnabled() && this._logger.info(`MLRawStreamKafkaConsumer - event.disconnected - connected for ${(Date.now() - metrics.connectionOpened) / 1000} secs`);
        } else {
            this._logger?.isInfoEnabled() && this._logger.info(`MLRawStreamKafkaConsumer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`);
        }
    }

    private async _onData(kafkaMessage: RDKafka.Message): Promise<void> {
        /* istanbul ignore if */
        if (!kafkaMessage) {
            this._logger?.isErrorEnabled() && this._logger.error("MLRawStreamKafkaConsumer - Received null message");
            return;
        }

        const msg = this._toIMessage(kafkaMessage);

        // call the provided handler and then commit
        await this._handlerCallback(msg);
        this._commitMsg(kafkaMessage);
    }

    private async _onPartitionEoF(event: RDKafka.EofEvent): Promise<void> {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawStreamKafkaConsumer - event.endOfPartition - ${Util.inspect(event)}`);
        await this._endOfPartitionFn(event)
    }

    private _toIMessage(kafkaMsg: RDKafka.Message): IRawMessage {
        const msg: IRawMessage = {
            topic: kafkaMsg.topic,
            partition: kafkaMsg.partition,
            offset: kafkaMsg.offset,
            timestamp: kafkaMsg.timestamp ?? null,
            key: null,
            value: null,
            headers: null
        };

        // parse msg key
        if (kafkaMsg.key) {
            if (this._options.outputType === MLKafkaRawStreamConsumerOutputType.Raw) {
                msg.key = kafkaMsg.key;
            } else {
                msg.key = kafkaMsg.key.toString();
            }
        }

        // parse msg headers
        if (kafkaMsg.headers!=null) {
            msg.headers = [];
            kafkaMsg.headers.forEach((kafkaHeader: RDKafka.MessageHeader) => {
                // NOTE: kafka headers are key/value pairs, only one pair will ever exist per header rec
                for (const key in kafkaHeader) {
                    if (!Object.prototype.hasOwnProperty.call(kafkaHeader, key)) continue;

                    if (this._options.outputType === MLKafkaRawStreamConsumerOutputType.Json || this._options.outputType === MLKafkaRawStreamConsumerOutputType.String) {
                        msg.headers!.push({[key]: kafkaHeader[key].toString()});
                    } else {
                        msg.headers!.push({[key]: kafkaHeader[key]});
                    }
                }
            })
        }

        // parse msg value
        if (kafkaMsg.value != null) {
            if (this._options.outputType === MLKafkaRawStreamConsumerOutputType.Json) {
                try {
                    msg.value = JSON.parse(kafkaMsg.value.toString());
                } catch (err) {
                    /* istanbul ignore next */
                    this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawStreamKafkaConsumer - error converting msg value to JSON");
                }
            } else if (this._options.outputType === MLKafkaRawStreamConsumerOutputType.String) {
                msg.value = kafkaMsg.value.toString();
            } else {
                msg.value = kafkaMsg.value;
            }
        }

        /// TODO parse msg timestamp to datetime obj

        return msg;
    }

    private _commitMsg(kafkaMessage: RDKafka.Message): void {
        if (this._globalConfig["enable.auto.commit"]!==true) {
            if (this._options.useSyncCommit) {
                this._client.commitMessageSync(kafkaMessage);
            } else {
                this._client.commitMessage(kafkaMessage);
            }
        }
    }

    setCallbackFn(handlerCallback: (message: IRawMessage) => Promise<void>): void {
        this._handlerCallback = handlerCallback;
    }

    setEndOfPartitionFn(handlerCallback: (event: IRawConsumeEofEvent) => Promise<void>): void {
        this._endOfPartitionFn = handlerCallback;
    }

    setTopics(topics: string[]): void {
        // this._topics = topics;
        this._logger?.isWarnEnabled() && this._logger.warn('IGNORED:: This is already done by the constructor');
    }

    async destroy(force: boolean): Promise<void> {
        this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - destroy called...");
        return await this.disconnect();
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - connect called...");
            if (!this._client.isConnected()) {
                this._logger?.isWarnEnabled() && this._logger.warn("MLRawStreamKafkaConsumer - connect called but consumer is not connected");
                return resolve();
            }
            return resolve();
        })
    }

    async disconnect(): Promise<void> {
        this._logger?.isWarnEnabled() && this._logger.warn('IGNORED:: This is already done by the constructor');
        return new Promise((resolve, reject) => {
            this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - disconnect called...");
            if (!this._client.isConnected()) {
                this._logger?.isWarnEnabled() && this._logger.warn("MLRawStreamKafkaConsumer - disconnect called but consumer is not connected");
                // return resolve();
            }
            this._stream.close(() => {
                this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - disconnected.");
                resolve();
            })
        })
    }

    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            // if (!this._client.isConnected()) {
            //     const err = new Error("MLRawStreamKafkaConsumer - Client is not connected, cannot start()");
            //     this._logger?.isErrorEnabled() && this._logger.error(err);
            //     reject(err);
            // }

            // this._logger?.isInfoEnabled() && this._logger.info(`MLRawStreamKafkaConsumer - Subscribing to topics ${JSON.stringify(this._topics)}`);
            // if (Array.isArray(this._topics) && this._topics.length > 0) {
            //     this._client.subscribe(this._topics);
            // }

            // this._client.consume();
            this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - started");
            resolve();
        })
    }

    async stop(): Promise<void> {
        this._client.unsubscribe();
        this._logger?.isInfoEnabled() && this._logger.info("MLRawStreamKafkaConsumer - stop called, unsubscribed from previously subscribed topics");
    }
}
