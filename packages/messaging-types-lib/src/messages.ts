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

import * as Crypto from "crypto";

export const MessageTypes = {
    STATE_EVENT : "STATE_EVENT",                // for private event-sourcing events
    STATE_SNAPSHOT : "STATE_SNAPSHOT",          // for private event-sourcing snapshot events
    DOMAIN_EVENT : "DOMAIN_EVENT",              // public domain events
    COMMAND : "COMMAND"                        // for internal/private BC commands
} as const;
export type MessageTypes = keyof typeof MessageTypes;

export const MessageInboundProtocol = {
    FSPIOP_v1_1 : "FSPIOP v1.1",
    ISO20022O : "ISO 20022O",
    GRPC_SYNC : "GRPC_SYNC"
} as const;
export type MessageInboundProtocol = keyof typeof MessageInboundProtocol;

export interface IMessage{
    msgType: MessageTypes;
    msgName: string;                            // name of the event or command
    msgId: string;                              // unique per message
    msgTimestamp: number;
    msgTopic: string;
    msgKey: string | null;                      // usually the id of the aggregate (used for partitioning)
    msgPartition: number | null;
    msgOffset: number | null;

    payload: any;

    inboundProtocolType: MessageInboundProtocol; // inbound/initial request protocol
    inboundProtocolOpaqueState: any;             // protocol opaque state  - all messages produced as response to this should copy it if present

    // MOVED to inside the opaqueState
    //fspiopOpaqueState: any;                   // FSPIOP Interop API opaque state token - all messages produced as response to this should copy it if present
    // iso20022OpaqueState: any;                // future place for ISO 20022 Interop API opaque state token - all messages produced as response to this should copy it if present

    tracingInfo?:any;                           // optional tracing information, should be propagated between calls
}

export interface IDomainMessage extends IMessage{
    boundedContextName: string       // name of the source/target BC (source if event, target if command)
    aggregateId: string              // id of the source/target aggregate (source if event, target if command)
}


export abstract class DomainMsg implements IDomainMessage {
    msgId: string = Crypto.randomUUID();
    msgTimestamp: number = Date.now();
    msgPartition: number | null = null;
    msgOffset: number | null;

    msgName: string = (this as any).constructor.name;

    abstract msgType: MessageTypes;
    abstract msgKey: string;
    abstract msgTopic: string;

    abstract aggregateId: string;
    abstract boundedContextName: string;
    //abstract msgName: string;

    abstract payload: any

    abstract inboundProtocolType: MessageInboundProtocol;
    abstract inboundProtocolOpaqueState: any;
    abstract tracingInfo?: any;

    abstract validatePayload(): void

    // static fromIDomainMessage(msg: IDomainMessage): DomainMsg | undefined {
    //     const obj: DomainMsg = Reflect.construct(this, [{}])
    //
    //     Object.assign(obj, msg)
    //
    //     obj.validatePayload()
    //
    //     return obj
    // }
}

export abstract class StateEventMsg extends DomainMsg {
    msgType: MessageTypes = MessageTypes.STATE_EVENT;

    inboundProtocolType: MessageInboundProtocol;
    inboundProtocolOpaqueState:any = null;
    tracingInfo:any = undefined;

    abstract validatePayload(): void
}

export abstract class DomainEventMsg extends DomainMsg {
    msgType: MessageTypes = MessageTypes.DOMAIN_EVENT;

    inboundProtocolType: MessageInboundProtocol;
    inboundProtocolOpaqueState:any = null;
    tracingInfo:any = undefined;

    isErrorEvent:boolean = false;
    sourceMessageName?:string = undefined;

    abstract validatePayload(): void
}

export abstract class CommandMsg extends DomainMsg {
    msgType: MessageTypes = MessageTypes.COMMAND;

    inboundProtocolType: MessageInboundProtocol;
    inboundProtocolOpaqueState:any = null;
    tracingInfo:any = undefined;

    abstract validatePayload(): void
}


// export abstract class StateSnapshotMsg extends DomainMsg {
//     msgType: MessageTypes = MessageTypes.STATE_SNAPSHOT
//     lastEventOffset: number                     // offset of the last event that was considered for the snapshot
//     eventsPartition: number                     // partition from the events
// }


