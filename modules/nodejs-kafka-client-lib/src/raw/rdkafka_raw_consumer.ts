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

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars */

import * as RDKafka from "node-rdkafka";
import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {IRawMessage, IRawMessageConsumer} from "./raw_types";

export enum MLKafkaRawConsumerOutputType {
    Raw,
    String,
    Json
}

const defaultOptions = {
    useSyncCommit: false,
    outputType: MLKafkaRawConsumerOutputType.Json
}

export class MLKafkaRawConsumerOptions {
    kafkaBrokerList: string
    kafkaGroupId?: string
    consumerClientId?: string
    useSyncCommit?: boolean
    outputType?: MLKafkaRawConsumerOutputType
    autoOffsetReset?: "earliest" | "latest" | "error" // default is latest
    messageMaxBytes?: number
}

export class MLKafkaRawConsumer implements IRawMessageConsumer {
    private readonly _logger: ILogger | null
    private _options: MLKafkaRawConsumerOptions
    private _globalConfig: RDKafka.ConsumerGlobalConfig
    private _topicConfig: RDKafka.ConsumerTopicConfig
    private _topics: string[]
    private readonly _client: RDKafka.KafkaConsumer
    private _handlerCallback: (message: IRawMessage) => Promise<void>

    constructor(options: MLKafkaRawConsumerOptions, logger: ILogger | null = null) {
        this._options = options;
        this._logger = logger;

        // parse options and apply defaults
        this._parseOptionsAndApplyDefault();

        this._client = new RDKafka.KafkaConsumer(this._globalConfig, this._topicConfig);

        this._client.on("ready", this._onReady.bind(this));
        this._client.on("event.log", this._onLog.bind(this));
        this._client.on("event.error", this._onError.bind(this));
        this._client.on("event.throttle", this._onThrottle.bind(this));
        this._client.on("event.stats", this._onStats.bind(this));
        this._client.on("disconnected", this._onDisconnect.bind(this));
        this._client.on("data", this._onData.bind(this));

        this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - instance created");
        this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - features: ${RDKafka.features.toString()}`);
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
    }

    private _onReady(info: RDKafka.ReadyInfo, metadata: RDKafka.Metadata): void {
        this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - event.ready - info: ${JSON.stringify(info, null, 2)}`);
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onError(error: RDKafka.LibrdKafkaError): void {
        this._logger?.isErrorEnabled() && this._logger.error(`MLRawKafkaConsumer - event.error - ${JSON.stringify(error, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onThrottle(eventData: any): void {
        this._logger?.isWarnEnabled() && this._logger.warn(`MLRawKafkaConsumer - event.throttle - ${JSON.stringify(eventData, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onLog(eventData: any): void {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.log - ${JSON.stringify(eventData, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onStats(eventData: any): void {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.stats - ${eventData.message}`);
    }

    private _onDisconnect(metrics: RDKafka.ClientMetrics): void {
        /* istanbul ignore else */
        if (metrics?.connectionOpened) {
            this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - event.disconnected - connected for ${(Date.now() - metrics.connectionOpened) / 1000} secs`);
        } else {
            this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`);
        }
    }

    private async _onData(kafkaMessage: RDKafka.Message): Promise<void> {
        /* istanbul ignore if */
        if (!kafkaMessage) {
            this._logger?.isErrorEnabled() && this._logger.error("MLRawKafkaConsumer - Received null message");
            return;
        }

        const msg = this._toIMessage(kafkaMessage);

        // call the provided handler and then commit
        await this._handlerCallback(msg);
        this._commitMsg(kafkaMessage);
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
            if (this._options.outputType === MLKafkaRawConsumerOutputType.Raw) {
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

                    if (this._options.outputType === MLKafkaRawConsumerOutputType.Json || this._options.outputType === MLKafkaRawConsumerOutputType.String) {
                        msg.headers!.push({[key]: kafkaHeader[key].toString()});
                    } else {
                        msg.headers!.push({[key]: kafkaHeader[key]});
                    }
                }
            })
        }

        // parse msg value
        if (kafkaMsg.value != null) {
            if (this._options.outputType === MLKafkaRawConsumerOutputType.Json) {
                try {
                    msg.value = JSON.parse(kafkaMsg.value.toString());
                } catch (err) {
                    /* istanbul ignore next */
                    this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaConsumer - error converting msg value to JSON");
                }
            } else if (this._options.outputType === MLKafkaRawConsumerOutputType.String) {
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


    setTopics(topics: string[]): void {
        this._topics = topics;
    }

    async destroy(force: boolean): Promise<void> {
        this._logger?.isInfoEnabled() && this._logger.info("MLKafkaProducer - destroy called...");
        return await this.disconnect();
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._client.connect({
                topic: this._topics[0],
                allTopics: false
            }, (err: RDKafka.LibrdKafkaError, metadata: RDKafka.Metadata) => {
                /* istanbul ignore if */
                if (err) {
                    this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaConsumer - error connecting to cluster");
                    return reject(new Error(`MLRawKafkaConsumer - error connecting to cluster: ${err.message}`));
                }

                // metadata is handled by the onReady event
                this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - connected!");
                resolve();
            })
        });
    }

    async disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - disconnect called...");
            if (!this._client.isConnected()) {
                this._logger?.isWarnEnabled() && this._logger.warn("MLRawKafkaConsumer - disconnect called but consumer is not connected");
                return resolve();
            }
            this._client.disconnect((err: any, _data: RDKafka.ClientMetrics) => {
                /* istanbul ignore if */
                if (err) {
                    this._logger?.isErrorEnabled() && this._logger.error("MLRawKafkaConsumer - disconnect failed", err);
                    return reject(err);
                }
                this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - disconnected.");
                resolve();
            })
        })
    }

    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this._client.isConnected()) {
                const err = new Error("MLRawKafkaConsumer - Client is not connected, cannot start()");
                this._logger?.isErrorEnabled() && this._logger.error(err);
                reject(err);
            }

            this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - Subscribing to topics ${JSON.stringify(this._topics)}`);
            if (Array.isArray(this._topics) && this._topics.length > 0) {
                this._client.subscribe(this._topics);
            }

            this._client.consume();
            this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - started");

            resolve();
        })
    }

    async stop(): Promise<void> {
        this._client.unsubscribe();
        this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - stop called, unsubscribed from previously subscribed topics");
    }
}
