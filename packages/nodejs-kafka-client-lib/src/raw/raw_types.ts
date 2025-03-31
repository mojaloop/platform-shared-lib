/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 * Crosslake
 - Pedro Sousa Barreto <pedrob@crosslaketech.com>

 --------------
 ******/

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export interface IRawMessageConsumer {
  setCallbackFn: (handlerCallback: (message: IRawMessage) => Promise<void>) => void;
  setBatchCallbackFn: (batchHandlerCallback: (messages: IRawMessage[]) => Promise<void>) => void;
  setTopics: (topics: string[]) => void;
  setBatchSize(size: number):void;

  destroy: (force: boolean) => Promise<void>;

  connect: () => Promise<void>;
  disconnect: (force: boolean) => Promise<void>;
  start: () => Promise<void>;
  startAndWaitForRebalance: () => Promise<void>
  stop: () => Promise<void>;
}

export declare interface IRawMessageProducer {
  destroy: () => Promise<void>;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

  send: (message: IRawMessage | IRawMessage[] | any) => Promise<void>;
}

export declare interface IRawAuthenticationOptions {
    protocol: "plaintext" | "ssl" | "sasl_plaintext" | "sasl_ssl";
    mechanism: "PLAIN" | "GSSAPI" | "SCRAM-SHA-256" | "SCRAM-SHA-512",
    username: string,
    password: string
}
