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

 * Arg Software
 - Jose Francisco Antunes<jfantunes@arg.software>
 - Rui Rocha<rui.rocha@arg.software>

 --------------
******/

"use strict";

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { TransfersBCTopics, TRANSFERS_AGGREGATE_NAME, TRANSFERS_BOUNDED_CONTEXT_NAME } from ".";

// Transfers
export type TransferPrepareDuplicateCheckFailedPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareDuplicateCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainErrors;

    payload: TransferPrepareDuplicateCheckFailedPayload;

    constructor (payload: TransferPrepareDuplicateCheckFailedPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareLiquidityCheckFailedPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareLiquidityCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainErrors;

    payload: TransferPrepareLiquidityCheckFailedPayload;

    constructor (payload: TransferPrepareLiquidityCheckFailedPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareInvalidPayerCheckFailedPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareInvalidPayerCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainErrors;

    payload: TransferPrepareInvalidPayerCheckFailedPayload;

    constructor (payload: TransferPrepareInvalidPayerCheckFailedPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareInvalidPayeeCheckFailedPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareInvalidPayeeCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainErrors;

    payload: TransferPrepareInvalidPayeeCheckFailedPayload;

    constructor (payload: TransferPrepareInvalidPayeeCheckFailedPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransfersBCUnknownErrorPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransfersBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransfersBCUnknownErrorPayload;

    constructor (payload: TransfersBCUnknownErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransfersBCOperatorErrorPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransfersBCOperatorErrorEvent extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainErrors;
    payload: TransfersBCOperatorErrorPayload;

    constructor (payload: TransfersBCOperatorErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}
