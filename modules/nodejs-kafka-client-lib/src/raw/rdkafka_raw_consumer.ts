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


import {EventEmitter} from "events";
import {TopicPartition} from "node-rdkafka";
import * as RDKafka from "node-rdkafka";
import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {LibrdKafkaError, Metadata} from "node-rdkafka/index";
import {IRawMessage, IRawMessageConsumer} from "./raw_types";

export enum MLKafkaRawConsumerOutputType {
	Raw,
	String,
	Json
}

const defaultOptions = {
	useSyncCommit: false,
	outputType: MLKafkaRawConsumerOutputType.Json,
	batchSize: 1,
	batchTimeoutMs: 1000
}

export class MLKafkaRawConsumerOptions {
	kafkaBrokerList: string;
	kafkaGroupId?: string;
	consumerClientId?: string;
	useSyncCommit?: boolean;
	outputType?: MLKafkaRawConsumerOutputType;
	autoOffsetReset?: "earliest" | "latest" | "error"; // default is latest
	messageMaxBytes?: number;
	sessionTimeoutMs?: number;   //Client group session and failure detection timeout, default is 45 secs
	batchSize?: number;
	batchTimeoutMs?: number;
}

type MLKafkaRawConsumerEvents =
	"ready"
	| "rebalance"
	| "rebalance.error"
	| "event"
	| "throttle"
	| "stats"
	| "disconnected";
type MLKafkaRawConsumerEventListenerMap = {
	"ready": () => void;
	"rebalance": (type: "assign" | "revoke", assignments: { topic: string, partition: number }[]) => void;
	"rebalance.error": (error: Error) => void;
	"event": (eventData: any) => void;
	"throttle": (eventData: any) => void;
	"stats": (eventData: any) => void;
	"disconnected": () => void;
}
type MLKafkaRawConsumerEventListener<K extends string> = K extends keyof MLKafkaRawConsumerEventListenerMap ? MLKafkaRawConsumerEventListenerMap[K]:never;


export class MLKafkaRawConsumer extends EventEmitter implements IRawMessageConsumer {
	private readonly _logger: ILogger | null;
	private _options: MLKafkaRawConsumerOptions;
	private _globalConfig: RDKafka.ConsumerGlobalConfig;
	private _topicConfig: RDKafka.ConsumerTopicConfig;
	private _topics: string[];
	private readonly _client: RDKafka.KafkaConsumer;
	private _handlerCallback: (message: IRawMessage) => Promise<void>;

	constructor(options: MLKafkaRawConsumerOptions, logger: ILogger | null = null) {
		super();
		this._options = options;
		this._logger = logger;

		// parse options and apply defaults
		this._parseOptionsAndApplyDefault();

		this._client = new RDKafka.KafkaConsumer(this._globalConfig, this._topicConfig);

		this._client.on("ready", this._onReady.bind(this));
		this._client.on("rebalance", this._onRebalance.bind(this));
		this._client.on("rebalance.error", this._onRebalanceError.bind(this));
		this._client.on("event.event", this._onEvent.bind(this));
		this._client.on("event.log", this._onLog.bind(this));
		this._client.on("event.error", this._onError.bind(this));
		this._client.on("event.throttle", this._onThrottle.bind(this));
		this._client.on("event.stats", this._onStats.bind(this));
		this._client.on("disconnected", this._onDisconnect.bind(this));
		//this._client.on("data", this._onData.bind(this));

		this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - instance created");
		this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - features: ${RDKafka.features.toString()}`);
	}

	on(event: MLKafkaRawConsumerEvents, listener: MLKafkaRawConsumerEventListener<MLKafkaRawConsumerEvents>): this {
		return super.on(event, listener);
	}

	once(event: MLKafkaRawConsumerEvents, listener: MLKafkaRawConsumerEventListener<MLKafkaRawConsumerEvents>): this {
		return super.once(event, listener);
	}

	private _parseOptionsAndApplyDefault(): void {
		this._globalConfig = {};
		this._topicConfig = {};

		// we want to always receive the rebalance events
		this._globalConfig.rebalance_cb = true;
		// we want to always receive the event events
		this._globalConfig.event_cb = true;

		if (this._options.useSyncCommit===undefined) {
			this._options.useSyncCommit = defaultOptions.useSyncCommit;
		}

		if (this._options.outputType===undefined) {
			this._options.outputType = defaultOptions.outputType;
		}

		if (this._options.batchSize===undefined) {
			this._options.batchSize = defaultOptions.batchSize;
		}

		if (this._options.batchTimeoutMs===undefined) {
			this._options.batchTimeoutMs = defaultOptions.batchTimeoutMs;
		}

		if (this._options.autoOffsetReset===undefined) {
			this._options.autoOffsetReset = "latest";
		}

		if (this._options.consumerClientId!==undefined) {
			this._globalConfig["client.id"] = this._options.consumerClientId;
		}

		if (this._options.kafkaGroupId!==undefined) {
			this._globalConfig["group.id"] = this._options.kafkaGroupId;
		}

		if (this._options.messageMaxBytes!==undefined) {
			this._globalConfig["message.max.bytes"] = this._options.messageMaxBytes;
		}

		if (this._options.sessionTimeoutMs!==undefined) {
			this._globalConfig["session.timeout.ms"] = this._options.sessionTimeoutMs;
		}

		// topic configs
		this._topicConfig["auto.offset.reset"] = this._options.autoOffsetReset;

		// global client options
		this._globalConfig ["metadata.broker.list"] = this._options.kafkaBrokerList;
	}

	private _onReady(info: RDKafka.ReadyInfo, metadata: RDKafka.Metadata): void {
		this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - event.ready - info: ${JSON.stringify(info, null, 2)}`);

		// this a huge
		//this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`);
		setImmediate(() => {
			this.emit("ready", info, metadata);
		});
	}

	/* istanbul ignore next */
	private _onError(error: RDKafka.LibrdKafkaError): void {
		this._logger?.isErrorEnabled() && this._logger.error(`MLRawKafkaConsumer - event.error - ${JSON.stringify(error, null, 2)}`);
	}

	/* istanbul ignore next */
	private _onRebalance(error: RDKafka.LibrdKafkaError, assignments: TopicPartition[]) {
		if (error && error.code!= -175 /*ERR__ASSIGN_PARTITIONS*/ && error.code!== -174 /*ERR__REVOKE_PARTITIONS*/) {
			// Ignore rebalance errors (other error codes), these will emit a dedicated the "rebalance.error"
			return;
		}

		// rdkafka library code emits the event as it receives it from the cluster and
		// before actually calling the assign() or unassign(), we need to wait a bit
		// half a second is enough and this is not a performance issue
		// https://github.com/Blizzard/node-rdkafka/blob/aba2011d6c1ae2a0ae745b5d71bef77aa42180cc/lib/kafka-consumer.js#L59
		setTimeout(() => {
			this._logger?.isDebugEnabled() && this._logger?.debug(`MLRawKafkaConsumer - event.rebalance - ${JSON.stringify(assignments, null, 2)}`);
			const type = error.code== -175 ? "assign":"revoke";
			this.emit("rebalance", type, assignments);
		}, 500);
	}

	/* istanbul ignore next */
	private _onRebalanceError(error: Error) {
		// same as above in _onRebalance()
		setTimeout(() => {
			this._logger?.isWarnEnabled() && this._logger?.warn(`MLRawKafkaConsumer - event.rebalance error - ${JSON.stringify(error, null, 2)}`);
			this.emit("rebalance.error", error);
		}, 500);
	}

	/* istanbul ignore next */
	private _onEvent(eventData: any): void {
		this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.event - ${JSON.stringify(eventData, null, 2)}`);
		this.emit("event", eventData);
	}

	/* istanbul ignore next */
	private _onThrottle(eventData: any): void {
		this._logger?.isWarnEnabled() && this._logger.warn(`MLRawKafkaConsumer - event.throttle - ${JSON.stringify(eventData, null, 2)}`);
		this.emit("throttle", eventData);
	}

	/* istanbul ignore next */
	private _onLog(eventData: any): void {
		this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.log - ${JSON.stringify(eventData, null, 2)}`);
	}

	/* istanbul ignore next */
	private _onStats(eventData: any): void {
		this._logger?.isDebugEnabled() && this._logger.debug(`MLRawKafkaConsumer - event.stats - ${eventData.message}`);
		this.emit("stats", eventData);
	}

	private _onDisconnect(metrics: RDKafka.ClientMetrics): void {
		/* istanbul ignore else */
		if (metrics?.connectionOpened) {
			this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - event.disconnected - connected for ${(Date.now() - metrics.connectionOpened) / 1000} secs`);
		} else {
			this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`);
		}
		this.emit("disconnected");
	}

	private _consumeLoop(): void {
		if (!this._client.isConnected()) return;

		this._client.consume(this._options.batchSize || defaultOptions.batchSize, async (err: RDKafka.LibrdKafkaError, kafkaMessages: RDKafka.Message[]) => {
			if (err) {
				if (!this._client.isConnected() || err.code == -172 /* not connected or wrong state */ || err.code == 3 /* Broker: Unknown topic or partition */) return;
				this._logger?.error(err, `MLKafkaRawConsumer got callback with err: ${err.message}`);
				setImmediate(() => {
					this._consumeLoop();
				});
				return;
			}

			for (const kafkaMessage of kafkaMessages) {
				const msg = this._toIMessage(kafkaMessage);
				// call the provided handler and then commit
				await this._handlerCallback(msg);
				this._commitMsg(kafkaMessage);
			}

			setImmediate(() => {
				this._consumeLoop();
			});
		});
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
			if (this._options.outputType===MLKafkaRawConsumerOutputType.Raw) {
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

					if (this._options.outputType===MLKafkaRawConsumerOutputType.Json || this._options.outputType===MLKafkaRawConsumerOutputType.String) {
						msg.headers!.push({[key]: kafkaHeader[key].toString()});
					} else {
						msg.headers!.push({[key]: kafkaHeader[key]});
					}
				}
			})
		}

		// parse msg value
		if (kafkaMsg.value!=null) {
			if (this._options.outputType===MLKafkaRawConsumerOutputType.Json) {
				try {
					msg.value = JSON.parse(kafkaMsg.value.toString());
				} catch (err) {
					/* istanbul ignore next */
					this._logger?.isErrorEnabled() && this._logger.error(err, "MLRawKafkaConsumer - error converting msg value to JSON");
				}
			} else if (this._options.outputType===MLKafkaRawConsumerOutputType.String) {
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
				// topic: this._topics[0],
				// allTopics: false
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

	startAndWaitForRebalance():Promise<void>{
		return new Promise(async (resolve, reject) => {
			// this._client.prependOnceListener("rebalance",  (error: RDKafka.LibrdKafkaError, assignments: TopicPartition[]) => {
			// 	const type = error.code== -175 ? "assign":"revoke";
			// 	if (type!=="assign") {
			// 		throw new Error("MLRawKafkaConsumer - got revoke in first rebalance event")
			// 	}
			//
			// 	this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - got rebalance on startAndWaitForRebalance()");
			// 	setImmediate(() => {
			// 		this._consumeLoop();
			// 	});
			// 	resolve();
			// });

			this.prependOnceListener("rebalance", (type, assignments) => {
				if (type!=="assign") {
					throw new Error("MLRawKafkaConsumer - got revoke in first rebalance event")
				}

				this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - got rebalance on startAndWaitForRebalance()");
				setImmediate(() => {
					this._consumeLoop();
				});
				resolve();
			});


			await this.start();
		});
	}

	start(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!Array.isArray(this._topics) || this._topics.length==0) {
				this._logger?.isInfoEnabled() && this._logger.warn("MLRawKafkaConsumer - no topics subscribed on start()");
				resolve();
				return;
			}

			this._client.once("subscribed", async (topics) => {
				this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - subscribed");
				setImmediate(() => {
					this._consumeLoop();
				});
				resolve();
			});


			this._logger?.isInfoEnabled() && this._logger.info(`MLRawKafkaConsumer - Subscribing to topics ${JSON.stringify(this._topics)}`);
			this._client.subscribe(this._topics);
		});
	}

	async stop(): Promise<void> {
		this._client.unsubscribe();
		this._logger?.isInfoEnabled() && this._logger.info("MLRawKafkaConsumer - stop called, unsubscribed from previously subscribed topics");
	}

	async getMetadata(): Promise<RDKafka.Metadata> {
		return new Promise<RDKafka.Metadata>((resolve, reject) => {
			this._client.getMetadata({allTopics: true}, (err: LibrdKafkaError, data: Metadata) => {
				if (err) {
					this._logger?.isErrorEnabled() && this._logger.error(`MLRawKafkaConsumer - error requesting metadata from RDKafka client - errorno: ${err.errno} message: ${err.message}`);
					return reject(err);
				}
				return resolve(data);
			});
		});

	}
}
