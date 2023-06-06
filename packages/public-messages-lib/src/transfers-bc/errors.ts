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
    payerFspId: string;
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
    payerFspId: string;
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

export type TransferDuplicateCheckFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferDuplicateCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferDuplicateCheckFailedEvtPayload;

    constructor (payload: TransferDuplicateCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareLiquidityCheckFailedPayload = {
    payerFspId: string;
    transferId: string;
    amount: string;
    currency: string;
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

export type TransferUnableToGetParticipantsInfoEvtPayload = {
    payerFspId: string;
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferUnableToGetParticipantsInfoEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferUnableToGetParticipantsInfoEvtPayload;

    constructor (payload: TransferUnableToGetParticipantsInfoEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferInvalidPayerCheckFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareInvalidPayerCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferInvalidPayerCheckFailedEvtPayload;

    constructor (payload: TransferInvalidPayerCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareInvalidPayeeCheckFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}

export class TransferPrepareInvalidPayeeCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferPrepareInvalidPayeeCheckFailedEvtPayload;

    constructor (payload: TransferPrepareInvalidPayeeCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPrepareRequestTimedoutEvtPayload = {
    payerFspId: string;
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
    payerFspId: string | null;
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
    payerFspId: string;
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
    payeeFspId: string;
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
    payeeFspId: string | null;
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
    payerFspId: string;
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
    payeeFspId: string;
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
    payerFspId: string;
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
    payerFspId: string;
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
    payerFspId: string;
    payeeFspId: string;
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
    payerFspId: string;
    payeeFspId: string;
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
    payerFspId: string;
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
    payerFspId: string;
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
    payerFspId: string;
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
    payeeFspId: string;
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

export type TransferPayerNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayerNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNotFoundFailedEvtPayload;

    constructor (payload: TransferPayerNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayeeNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayeeNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeNotFoundFailedEvtPayload;

    constructor (payload: TransferPayeeNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferHubNotFoundFailedEvtPayload = {
    transferId: string;
    errorDescription: string;
}
export class TransferHubNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubNotFoundFailedEvtPayload;

    constructor (payload: TransferHubNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}


export type TransferHubAccountNotFoundFailedEvtPayload = {
    transferId: string;
    errorDescription: string;
}
export class TransferHubAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferHubAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayerPositionAccountNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayerPositionAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerPositionAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPayerPositionAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayerLiquidityAccountNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayerLiquidityAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerLiquidityAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPayerLiquidityAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayeePositionAccountNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayeePositionAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeePositionAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPayeePositionAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayeeLiquidityAccountNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayeeLiquidityAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeLiquidityAccountNotFoundFailedEvtPayload;

    constructor (payload: TransferPayeeLiquidityAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayerNotActiveEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayerNotActiveEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNotActiveEvtPayload;

    constructor (payload: TransferPayerNotActiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayerNotApprovedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayerNotApprovedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNotApprovedEvtPayload;

    constructor (payload: TransferPayerNotApprovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayeeNotActiveEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayeeNotActiveEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeNotActiveEvtPayload;

    constructor (payload: TransferPayeeNotActiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferPayeeNotApprovedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorDescription: string;
}
export class TransferPayeeNotApprovedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeNotApprovedEvtPayload;

    constructor (payload: TransferPayeeNotApprovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransfersBCUnknownErrorPayload = {
    payerFspId: string;
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
    payerFspId: string;
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
