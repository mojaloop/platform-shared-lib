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

 * Arg Software
 - Jose Francisco Antunes<jfantunes@arg.software>
 - Rui Rocha<rui.rocha@arg.software>

 --------------
******/

"use strict";

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME, FOREIGN_EXCHANGE_AGGREGATE_NAME, ForeignExchangeBCSvcTopics } from "..";


export type ForeignExchangeBCInvalidMessagePayloadErrorPayload = {
    requesterFspId: string;
    errorDescription: string;
}

export class ForeignExchangeBCInvalidMessagePayloadErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCSvcTopics.DomainEvents;
    payload: ForeignExchangeBCInvalidMessagePayloadErrorPayload;

    constructor (payload: ForeignExchangeBCInvalidMessagePayloadErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type ForeignExchangeBCInvalidMessageTypeErrorPayload = {
    requesterFspId: string;
    errorDescription: string;
}

export class ForeignExchangeBCInvalidMessageTypeErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCSvcTopics.DomainEvents;
    payload: ForeignExchangeBCInvalidMessageTypeErrorPayload;

    constructor (payload: ForeignExchangeBCInvalidMessageTypeErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type ForeignExchangeBCInvalidRequesterParticipantErrorPayload = {
    requesterFspId: string;
    errorDescription: string;
}

export class ForeignExchangeBCInvalidRequesterParticipantErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCSvcTopics.DomainEvents;
    payload: ForeignExchangeBCInvalidRequesterParticipantErrorPayload;

    constructor (payload: ForeignExchangeBCInvalidRequesterParticipantErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type ForeignExchangeBCUnknownErrorPayload = {
    requesterFspId: string;
    sourceCurrency: string | null;
    targetCurrency: string | null;
    errorDescription: string;
}

export class ForeignExchangeBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCSvcTopics.DomainEvents;
    payload: ForeignExchangeBCUnknownErrorPayload;

    constructor (payload: ForeignExchangeBCUnknownErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}