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

 * ModusBox
 - Miguel de Barros <miguel.debarros@modusbox.com>
 - Roman Pietrzak <roman.pietrzak@modusbox.com>

 --------------
 ******/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLKafkaConsumer = exports.MLKafkaConsumerOutputType = void 0;
const tslib_1 = require("tslib");
const RDKafka = (0, tslib_1.__importStar)(require("node-rdkafka"));
var MLKafkaConsumerOutputType;
(function (MLKafkaConsumerOutputType) {
    MLKafkaConsumerOutputType[MLKafkaConsumerOutputType["Raw"] = 0] = "Raw";
    MLKafkaConsumerOutputType[MLKafkaConsumerOutputType["String"] = 1] = "String";
    MLKafkaConsumerOutputType[MLKafkaConsumerOutputType["Json"] = 2] = "Json";
})(MLKafkaConsumerOutputType = exports.MLKafkaConsumerOutputType || (exports.MLKafkaConsumerOutputType = {}));
const defaultOptions = {
    useSyncCommit: false,
    outputType: MLKafkaConsumerOutputType.Json
};
class MLKafkaConsumer {
    constructor(globalConfs, topicConfs, logger = null, options = null) {
        this._globalConfig = globalConfs;
        this._topicConfig = topicConfs;
        this._options = options || defaultOptions;
        this._logger = logger;
        //this._isPaused = false
        this._client = new RDKafka.KafkaConsumer(this._globalConfig, this._topicConfig);
        this._client.on('ready', this._onReady.bind(this));
        this._client.on('event.log', this._onLog.bind(this));
        this._client.on('event.error', this._onError.bind(this));
        this._client.on('event.throttle', this._onThrottle.bind(this));
        this._client.on('event.stats', this._onStats.bind(this));
        this._client.on('disconnected', this._onStats.bind(this));
        this._client.on('data', this._onData.bind(this));
        this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - instance created');
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - features: ${RDKafka.features}`);
    }
    _onReady(info, metadata) {
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - event.ready - info: ${JSON.stringify(info, null, 2)}`);
        this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`);
    }
    _onError(error) {
        this._logger?.isErrorEnabled() && this._logger.error(`MLKafkaConsumer - event.error - ${JSON.stringify(error, null, 2)}`);
    }
    _onThrottle(eventData) {
        this._logger?.isWarnEnabled() && this._logger.warn(`MLKafkaConsumer - event.throttle - ${JSON.stringify(eventData, null, 2)}`);
    }
    _onLog(eventData) {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - event.log - ${JSON.stringify(eventData, null, 2)}`);
    }
    _onStats(eventData) {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - event.stats - ${eventData.message}`);
    }
    _onDisconnect(metrics) {
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`);
    }
    async _onData(kafkaMessage) {
        if (!kafkaMessage) {
            this._logger?.isErrorEnabled() && this._logger.error('MLKafkaConsumer - Received null message');
            return;
        }
        const msg = this._toIMessage(kafkaMessage);
        if (this._filterFn && !this._filterFn(msg)) {
            this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - ignoring message filtered out by filterFunction`);
            if (this._globalConfig["enable.auto.commit"] != true) {
                // We are ignoring this message, but if we don't commit it and there will be no more messages that we can commit,
                // then all the ignored messages will appear "stuck". Everything reports lag.
                this._commitMsg(kafkaMessage);
            }
            return;
        }
        // call the provided handler
        await this._handlerCallback(msg);
        this._commitMsg(kafkaMessage);
    }
    _commitMsg(kafkaMessage) {
        if (this._globalConfig["enable.auto.commit"] != true) {
            if (this._options.useSyncCommit) {
                this._client.commitMessageSync(kafkaMessage);
            }
            else {
                this._client.commitMessage(kafkaMessage);
            }
        }
    }
    _toIMessage(kafkaMsg) {
        const msg = {
            topic: kafkaMsg.topic,
            key: null,
            value: null,
            timestamp: kafkaMsg.timestamp,
            headers: []
        };
        if (kafkaMsg.key) {
            if (this._options.outputType === MLKafkaConsumerOutputType.Raw) {
                msg.key = kafkaMsg.key;
            }
            else {
                msg.key = kafkaMsg.key.toString();
            }
        }
        if (kafkaMsg.value) {
            if (this._options.outputType === MLKafkaConsumerOutputType.Json) {
                try {
                    msg.value = JSON.parse(kafkaMsg.value.toString());
                }
                catch (err) {
                    this._logger?.isErrorEnabled() && this._logger.error(err, "MLKafkaConsumer - error converting msg value to JSON");
                }
            }
            else if (this._options.outputType === MLKafkaConsumerOutputType.String) {
                msg.value = kafkaMsg.value.toString();
            }
            else {
                msg.value = kafkaMsg.value;
            }
        }
        // if (kafkaMsg.headers) {
        //     msg.headers = []
        //     for (let key in kafkaMsg.headers) {
        //         if (!key) continue
        //
        //         if (this._options.outputType===MLKafkaConsumerOutputType.Json || this._options.outputType===MLKafkaConsumerOutputType.String) {
        //             msg.headers.push({[key]: kafkaMsg.headers[key].toString()})
        //         } else {
        //             msg.headers.push({[key]: kafkaMsg.headers[key]})
        //         }
        //
        //     }
        // }
        return msg;
    }
    setCallbackFn(handlerCallback) {
        this._handlerCallback = handlerCallback;
    }
    setFilteringFn(filterFn) {
        this._filterFn = filterFn;
    }
    setTopics(topics) {
        this._topics = topics;
    }
    async destroy(force) {
        return await new Promise((resolve, reject) => {
            this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - disconnect()-ing...');
            this._client.disconnect((err, _data) => {
                if (err !== null) {
                    this._logger?.isErrorEnabled() && this._logger.error('MLKafkaConsumer - disconnect() failed', err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async connect() {
        return await new Promise((resolve, reject) => {
            this._client.connect();
            this._client.once('ready', (info, metadata) => {
                this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - connected!');
                resolve();
            });
            this._client.once('event.error', (error) => {
                this._logger?.isErrorEnabled() && this._logger.error(error, 'MLKafkaConsumer - error connecting to cluster');
                reject(new Error(`MLKafkaConsumer - error connecting to cluster: ${error.message}`));
            });
        });
    }
    disconnect(force) {
        throw new Error('Method not implemented.');
    }
    async start() {
        return await new Promise((resolve, reject) => {
            if (!this._client.isConnected()) {
                const err = new Error('MLKafkaConsumer - Client is not connected, cannot start()');
                this._logger?.isErrorEnabled() && this._logger.error(err);
                reject(err);
            }
            this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - Subscribing to topics ${JSON.stringify(this._topics)}`);
            if (Array.isArray(this._topics) && this._topics.length > 0) {
                this._client.subscribe(this._topics);
            }
            this._client.consume();
            this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - started');
            resolve();
        });
    }
    async stop() {
        throw new Error('Method not implemented.');
    }
}
exports.MLKafkaConsumer = MLKafkaConsumer;
//# sourceMappingURL=rdkafka_consumer.js.map