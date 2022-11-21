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

import { EofEvent } from "node-rdkafka";

export interface IRawMessageHeader {
  [key: string]: string | Buffer;
}

export interface IRawMessage {
  value: Buffer | string | object | null;
  topic: string;
  key: Buffer | string | null;
  timestamp: number | null;
  headers: IRawMessageHeader[] | null;

  partition: number | null;
  offset: number | null;
}

export type IRawConsumeEofEvent = EofEvent;

export interface IRawMessageConsumer {
  setCallbackFn: (handlerCallback: (message: IRawMessage) => Promise<void>) => void;
  setEndOfPartitionFn: (handlerCallback: (event: IRawConsumeEofEvent) => Promise<void>) => void;
  setTopics: (topics: string[]) => void;

  destroy: (force: boolean) => Promise<void>;

  connect: () => Promise<void>;
  disconnect: (force: boolean) => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export declare interface IRawMessageProducer {
  destroy: () => Promise<void>;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

  send: (message: IRawMessage | IRawMessage[] | any) => Promise<void>;
}
