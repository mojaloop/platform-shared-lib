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
export type TransferInvalidMessagePayloadEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferInvalidMessagePayloadEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferInvalidMessagePayloadEvtPayload;

    constructor (payload: TransferInvalidMessagePayloadEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferInvalidMessageTypeEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferInvalidMessageTypeEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferInvalidMessageTypeEvtPayload;

    constructor (payload: TransferInvalidMessageTypeEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareDuplicateCheckFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareDuplicateCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferPrepareDuplicateCheckFailedEvtPayload;

    constructor (payload: TransferPrepareDuplicateCheckFailedEvtPayload) {
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
    msgTopic: string = TransfersBCTopics.DomainEvents;

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
    msgTopic: string = TransfersBCTopics.DomainEvents;

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
    msgTopic: string = TransfersBCTopics.DomainEvents;

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

export type TransferPrepareRequestTimedoutEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareRequestTimedoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferPrepareRequestTimedoutEvtPayload;

    constructor (payload: TransferPrepareRequestTimedoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryInvalidPayerCheckFailedEvtPayload = {
    fspId: string | null;
    transferId: string;
    errorDescription: string;
}
export class TransferQueryInvalidPayerCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryInvalidPayerCheckFailedEvtPayload;

    constructor (payload: TransferQueryInvalidPayerCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryPayerNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferQueryPayerNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryPayerNotFoundFailedEvtPayload;

    constructor (payload: TransferQueryPayerNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryPayeeNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferQueryPayeeNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryPayeeNotFoundFailedEvtPayload;

    constructor (payload: TransferQueryPayeeNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryInvalidPayeeCheckFailedEvtPayload = {
    fspId: string | null;
    transferId: string;
    errorDescription: string;
}
export class TransferQueryInvalidPayeeCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryInvalidPayeeCheckFailedEvtPayload;

    constructor (payload: TransferQueryInvalidPayeeCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryInvalidPayerParticipantIdEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferQueryInvalidPayerParticipantIdEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryInvalidPayerParticipantIdEvtPayload;

    constructor (payload: TransferQueryInvalidPayerParticipantIdEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryInvalidPayeeParticipantIdEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferQueryInvalidPayeeParticipantIdEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryInvalidPayeeParticipantIdEvtPayload;

    constructor (payload: TransferQueryInvalidPayeeParticipantIdEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferUnableToGetTransferByIdEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferUnableToGetTransferByIdEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToGetTransferByIdEvtPayload;

    constructor (payload: TransferUnableToGetTransferByIdEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}


export type TransferNotFoundEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferNotFoundEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferNotFoundEvtPayload;

    constructor (payload: TransferNotFoundEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferUnableToAddEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferUnableToAddEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToAddEvtPayload;

    constructor (payload: TransferUnableToAddEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferUnableToUpdateEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferUnableToUpdateEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToUpdateEvtPayload;

    constructor (payload: TransferUnableToUpdateEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferFulfilCommittedRequestedTimedoutEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferFulfilCommittedRequestedTimedoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferFulfilCommittedRequestedTimedoutEvtPayload;

    constructor (payload: TransferFulfilCommittedRequestedTimedoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferFulfilPostCommittedRequestedTimedoutEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferFulfilPostCommittedRequestedTimedoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferFulfilPostCommittedRequestedTimedoutEvtPayload;

    constructor (payload: TransferFulfilPostCommittedRequestedTimedoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferCancelReservationFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferCancelReservationFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferCancelReservationFailedEvtPayload;

    constructor (payload: TransferCancelReservationFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferCancelReservationAndCommitFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferCancelReservationAndCommitFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferCancelReservationAndCommitFailedEvtPayload;

    constructor (payload: TransferCancelReservationAndCommitFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayerParticipantNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayerParticipantNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerParticipantNotFoundFailedEvtPayload;

    constructor (payload: TransferPayerParticipantNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayeeParticipantNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayeeParticipantNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeParticipantNotFoundFailedEvtPayload;

    constructor (payload: TransferPayeeParticipantNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferHubParticipantNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferHubParticipantNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubParticipantNotFoundFailedEvtPayload;

    constructor (payload: TransferHubParticipantNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPreparePayerNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPreparePayerNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPreparePayerNotFoundFailedEvtPayload;

    constructor (payload: TransferPreparePayerNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPreparePayeeNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPreparePayeeNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPreparePayeeNotFoundFailedEvtPayload;

    constructor (payload: TransferPreparePayeeNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareHubNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPrepareHubNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPrepareHubNotFoundFailedEvtPayload;

    constructor (payload: TransferPrepareHubNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}


export type TransferPrepareHubAccountNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPrepareHubAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPrepareHubAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPrepareHubAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPreparePayerPositionAccountNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPreparePayerPositionAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPreparePayerPositionAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPreparePayerPositionAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPreparePayerLiquidityAccountNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPreparePayerLiquidityAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPreparePayerLiquidityAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPreparePayerLiquidityAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPreparePayeePositionAccountNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPreparePayeePositionAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPreparePayeePositionAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPreparePayeePositionAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPreparePayeeLiquidityAccountNotFoundFailedEvtPayload = {
    fspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPreparePayeeLiquidityAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPreparePayeeLiquidityAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPreparePayeeLiquidityAccountNotFoundFailedEvtPayload) {
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
