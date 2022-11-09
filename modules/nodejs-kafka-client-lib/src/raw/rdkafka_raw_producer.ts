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

import {EventEmitter} from "events";
import * as RDKafka from "node-rdkafka";
import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {NumberNullUndefined} from "node-rdkafka/index";
import {IRawMessage, IRawMessageHeader, IRawMessageProducer} from "./raw_types";

export enum MLKafkaRawProducerCompressionCodecs {
    NONE = "none",
    GZIP = "gzip",
    SNAPPY = "snappy",
    LZ4 = "lz4",
    ZSTD = "zstd"
}

export class MLKafkaRawProducerOptions {
    kafkaBrokerList: string
    producerClientId?: string
    skipAcknowledgements?: boolean
    messageMaxBytes?: number
    compressionCodec?: MLKafkaRawProducerCompressionCodecs
    compressionLevel?: number
}

/*interface MLKafkaRawProducerEventListenerMap {
    "deliveryReport": (topic: string, partition: number | null, offset: number | null) => void,
    "testEvent": (testEventArg: number) => void
}*/

export class MLKafkaRawProducer extends EventEmitter implements IRawMessageProducer {
    private readonly _logger: ILogger | null;
    private readonly _client!: RDKafka.HighLevelProducer;
    private _globalConfig: RDKafka.ProducerGlobalConfig;
    private _topicConfig: RDKafka.ProducerTopicConfig;
    private readonly _options: MLKafkaRawProducerOptions;
    private _deliveryReportHandlerFn: null | ((topic:string, partition:number, offset:number) => void) = null;

/*    // synthetic sugar for type events
    public on<K extends keyof MLKafkaRawProducerEventListenerMap>(e: K, listener: MLKafkaRawProducerEventListenerMap[K]): this {
        return super.on(e, listener);
    }

    public once<K extends keyof MLKafkaRawProducerEventListenerMap>(e: K, listener: MLKafkaRawProducerEventListenerMap[K]): this {
        return super.once(e, listener)
    }

    public emit<K extends keyof MLKafkaRawProducerEventListenerMap>(event: K, ...args: Parameters<MLKafkaRawProducerEventListenerMap[K]>): boolean {
        return super.emit(event, ...args)
    }*/

    constructor(options: MLKafkaRawProducerOptions, logger: ILogger | null = null) {
        super();
        this._options = options;
        this._logger = logger;

        // parse options and apply defaults
        this._parseOptionsAndApplyDefault();

        // this._topicConfig.partitioner_cb = () => {
        //   console.log(arguments)
        // }

        this._client = new RDKafka.HighLevelProducer(this._globalConfig, this._topicConfig);

        this._client.on("ready", this._onReady.bind(this));
        this._client.on("event.error", this._onError.bind(this));
        this._client.on("event.throttle", this._onThrottle.bind(this));
        this._client.on("event.log", this._onLog.bind(this));
        this._client.on("event.stats", this._onStats.bind(this));
        this._client.on("disconnected", this._onDisconnect.bind(this));
        this._client.on("delivery-report", this._onDeliveryReport.bind(this));

        this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaProducer - instance created");
        this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaProducer - features: ${RDKafka.features}`);
    }

    private _parseOptionsAndApplyDefault(): void {
        // global client options
        this._globalConfig = {
            "metadata.broker.list": this._options.kafkaBrokerList
        };
        this._topicConfig = {};

        if (this._options.producerClientId !== undefined) {
            this._globalConfig["client.id"] = this._options.producerClientId;
        }

        if (this._options.skipAcknowledgements===true) {
            this._topicConfig["request.required.acks"] = 0;
        }

        if (this._options.messageMaxBytes !== undefined) {
            this._globalConfig["message.max.bytes"] = this._options.messageMaxBytes;
        }

        if (this._options.compressionCodec !== undefined) {
            this._topicConfig["compression.codec"] = this._options.compressionCodec;
        }

        if (this._options.compressionLevel !== undefined) {
            this._topicConfig["compression.level"] = this._options.compressionLevel;
        }

        this._globalConfig.dr_cb = true;
    }

    private _onReady(info: RDKafka.ReadyInfo, metadata: RDKafka.Metadata): void {
        this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaProducer - event.ready - info: ${JSON.stringify(info, null, 2)}`);
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaProducer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onError(error: RDKafka.LibrdKafkaError): void {
        this._logger?.isErrorEnabled() && this._logger.error(`MLRawKafkaProducer - event.error - ${JSON.stringify(error, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onThrottle(eventData: any) {
        this._logger?.isWarnEnabled() && this._logger.warn(`MLRawKafkaProducer - event.throttle - ${JSON.stringify(eventData, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onLog(eventData: any): void {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaProducer - event.log - ${JSON.stringify(eventData, null, 2)}`);
    }

    /* istanbul ignore next */
    private _onStats(eventData: any): void {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaProducer - event.stats - ${eventData.message}`);
    }

    private _onDisconnect(metrics: RDKafka.ClientMetrics): void {
        /* istanbul ignore else */
        if (metrics?.connectionOpened) {
            this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaProducer - event.disconnected - connected for ${(Date.now() - metrics.connectionOpened) / 1000} secs`);
        } else {
            this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaProducer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`);
        }
    }

    private _onDeliveryReport(err: RDKafka.LibrdKafkaError, eventData: RDKafka.DeliveryReport): void {
        /* istanbul ignore if */
        if (err) {
            this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaProducer - delivery-report error");
            return;
        }
        this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaProducer - delivery-report - ${JSON.stringify(eventData, null, 2)}`);
        if(this._deliveryReportHandlerFn){
            this._deliveryReportHandlerFn(eventData.topic, eventData.partition, eventData.offset);
        }
    }

    private _toRDKafkaProduceParams(msg: IRawMessage): { topic: string, partition: NumberNullUndefined, message: Buffer, key: Buffer, timestamp: NumberNullUndefined, headers: IRawMessageHeader[] } {
        const topic: string = msg.topic;
        const partition = -1; // use default from rdkafka
        const timestamp = msg.timestamp;

        let message: Buffer = Buffer.alloc(0); // default
        if (typeof (msg.value)==="string") {
            message = Buffer.from(msg.value, "utf-8");
        } else if (typeof (msg.value)==="object") {
            try {
                message = Buffer.from(JSON.stringify(msg.value), "utf-8");
            } catch (err) {
                /* istanbul ignore next */
                this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaProducer - error parsing message value - JSON.stringify() error");
            }
        }

        let key: Buffer = Buffer.alloc(0); // default
        if (typeof (msg.key)==="string") {
            key = Buffer.from(msg.key, "utf-8");
        } else if (typeof (msg.key)==="object") {
            try {
                key = Buffer.from(JSON.stringify(msg.key), "utf-8");
            } catch (err) {
                /* istanbul ignore next */
                this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaProducer - error parsing key value - JSON.stringify() error");
            }
        }

        const headers: IRawMessageHeader[] = [];
        msg.headers?.forEach((header) => {
            // NOTE: kafka headers are key/value pairs, only one pair will ever exist per header rec
            for (const key in header) {
                if (!Object.prototype.hasOwnProperty.call(header, key)) continue;
                headers.push({[key]: header[key]});
            }
        });

        return {
            topic,
            partition,
            message,
            key,
            timestamp,
            headers
        };
    }

    async send(message: IRawMessage | IRawMessage[] | any): Promise<void> {
        return new Promise((resolve, reject) => {
            const messages: IRawMessage[] = Array.isArray(message) ? message:[message] as IRawMessage[];

            let rejected = false;
            let acksRemaining: number = messages.length;

            messages.forEach((msg: IRawMessage) => {
                try {
                    const produceParams = this._toRDKafkaProduceParams(msg);
                    this._client.produce(
                            produceParams.topic,
                            produceParams.partition,
                            produceParams.message,
                            produceParams.key || undefined,
                            produceParams.timestamp || undefined,
                            produceParams.headers,
                            (err: any, offset?: RDKafka.NumberNullUndefined) => {
                                /* istanbul ignore if */
                                if (err!==null) {
                                    this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaProducer - send - Error getting aks from publisher")
                                    if (!rejected) {
                                        rejected = true;
                                        reject(err);
                                    }
                                } else {
                                    //this.emit("deliveryReport", produceParams.topic, produceParams.partition || null, offset || null);

                                    acksRemaining--;
                                    if (acksRemaining <= 0) {
                                        resolve();
                                    }
                                }
                            }
                    );
                } catch (err) {
                    /* istanbul ignore next */
                    this._logger?.isErrorEnabled() && this._logger.error("MLRawKafkaProducer - send ...error !", err);
                    /* istanbul ignore next */
                    reject(err);
                }
            })
        });
    }

    async disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaProducer - disconnect called...");
            if (!this._client.isConnected()) {
                this._logger?.isWarnEnabled() && this._logger.warn("MLRawKafkaProducer - disconnect called but producer is not connected");
                return resolve();
            }
            this._client.disconnect((err: any, _data: RDKafka.ClientMetrics) => {
                /* istanbul ignore if */
                if (err) {
                    this._logger?.isErrorEnabled() && this._logger.error("MLRawKafkaProducer - disconnect failed", err);
                    return reject(err);
                }
                this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaProducer - disconnected.");
                resolve();
            });
        });
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._client.connect(undefined, (err: RDKafka.LibrdKafkaError, metadata: RDKafka.Metadata) => {
                /* istanbul ignore if */
                if (err) {
                    this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaProducer - error connecting to cluster");
                    return reject(new Error(`MLRawKafkaProducer - error connecting to cluster: ${err.message}`));
                }

                this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaProducer::event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`);
                this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaProducer - connected!");
                resolve();
            });
        });
    }

    setDeliveryReportFn(handlerCallback: null | ((topic:string, partition:number, offset:number) => void)): void {
        this._deliveryReportHandlerFn = handlerCallback;
    }

    async destroy(): Promise<void> {
        this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaProducer - destroy called...");
        return await this.disconnect();
    }
}
