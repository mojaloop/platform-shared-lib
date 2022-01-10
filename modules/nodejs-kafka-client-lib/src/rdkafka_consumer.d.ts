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
import * as RDKafka from 'node-rdkafka';
import { ILogger } from "@mojaloop/logging-bc-logging-client-lib";
import { IMessageConsumer, IMessage } from '@mojaloop/platform-shared-lib-messaging-types-lib';
export declare enum MLKafkaConsumerOutputType {
    Raw = 0,
    String = 1,
    Json = 2
}
export declare type MLKafkaConsumerOptions = {
    useSyncCommit: boolean;
    outputType: MLKafkaConsumerOutputType;
};
export declare class MLKafkaConsumer implements IMessageConsumer {
    private _logger;
    private _options;
    private readonly _globalConfig;
    private readonly _topicConfig;
    private _topics;
    private _client;
    private _handlerCallback;
    private _filterFn;
    constructor(globalConfs: RDKafka.ConsumerGlobalConfig, topicConfs: RDKafka.ConsumerTopicConfig, logger?: ILogger | null, options?: MLKafkaConsumerOptions | null);
    private _onReady;
    private _onError;
    private _onThrottle;
    private _onLog;
    private _onStats;
    private _onDisconnect;
    private _onData;
    private _commitMsg;
    private _toIMessage;
    setCallbackFn(handlerCallback: (message: IMessage) => Promise<void>): void;
    setFilteringFn(filterFn: (message: IMessage) => boolean): void;
    setTopics(topics: string[]): void;
    destroy(force: boolean): Promise<void>;
    connect(): Promise<void>;
    disconnect(force: boolean): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
