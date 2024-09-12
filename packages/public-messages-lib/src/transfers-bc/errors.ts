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

import { TransfersBCTopics, TRANSFERS_AGGREGATE_NAME, TRANSFERS_BOUNDED_CONTEXT_NAME } from ".";
import {DomainEventMsg} from "@mojaloop/platform-shared-lib-messaging-types-lib";

// Transfers
export type TransferInvalidMessagePayloadEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferInvalidMessagePayloadEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferInvalidMessagePayloadEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferInvalidMessagePayloadEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferInvalidMessageTypeEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferInvalidMessageTypeEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferInvalidMessageTypeEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferInvalidMessageTypeEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferDuplicateCheckFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}

export class TransferDuplicateCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferDuplicateCheckFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferDuplicateCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPrepareLiquidityCheckFailedPayload = {
    payerFspId: string;
    transferId: string;
    amount: string;
    currency: string;
    errorCode: string;
}

export class TransferPrepareLiquidityCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferPrepareLiquidityCheckFailedPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPrepareLiquidityCheckFailedPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToGetParticipantsInfoEvtPayload = {
    payerFspId: string;
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}

export class TransferUnableToGetParticipantsInfoEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferUnableToGetParticipantsInfoEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToGetParticipantsInfoEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferInvalidPayerCheckFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}

export class TransferPrepareInvalidPayerCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferInvalidPayerCheckFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferInvalidPayerCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPrepareInvalidPayeeCheckFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}

export class TransferPrepareInvalidPayeeCheckFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferPrepareInvalidPayeeCheckFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPrepareInvalidPayeeCheckFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPrepareRequestTimedoutEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}

export class TransferPrepareRequestTimedoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: TransferPrepareRequestTimedoutEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPrepareRequestTimedoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferQueryPayerNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferQueryPayerNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryPayerNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferQueryPayerNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferQueryPayeeNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferQueryPayeeNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryPayeeNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferQueryPayeeNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToGetTransferByIdEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferUnableToGetTransferByIdEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToGetTransferByIdEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToGetTransferByIdEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type TransferNotFoundEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferNotFoundEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferNotFoundEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferNotFoundEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToAddEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferUnableToAddEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToAddEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToAddEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToUpdateEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferUnableToUpdateEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToUpdateEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToUpdateEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferFulfilCommittedRequestedTimedoutEvtPayload = {
    payerFspId: string;
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferFulfilCommittedRequestedTimedoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferFulfilCommittedRequestedTimedoutEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferFulfilCommittedRequestedTimedoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferFulfilPostCommittedRequestedTimedoutEvtPayload = {
    payerFspId: string;
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferFulfilPostCommittedRequestedTimedoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferFulfilPostCommittedRequestedTimedoutEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferFulfilPostCommittedRequestedTimedoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferCancelReservationFailedEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferCancelReservationFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferCancelReservationFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferCancelReservationFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferCancelReservationAndCommitFailedEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferCancelReservationAndCommitFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferCancelReservationAndCommitFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferCancelReservationAndCommitFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerParticipantNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerParticipantNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerParticipantNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerParticipantNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeeParticipantNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeeParticipantNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeParticipantNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeeParticipantNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferHubParticipantNotFoundFailedEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferHubParticipantNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubParticipantNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferHubParticipantNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeeNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeeNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeeNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferHubNotFoundFailedEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferHubNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferHubNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferHubIdMismatchEvtPayload = {
    hubId: string;
    transferId: string;
    errorCode: string;
}
export class TransferHubIdMismatchEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubIdMismatchEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferHubIdMismatchEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferHubNotActiveEvtPayload = {
    hubId: string;
    transferId: string;
    errorCode: string;
}
export class TransferHubNotActiveEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubNotActiveEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferHubNotActiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferHubNotApprovedEvtPayload = {
    hubId: string;
    transferId: string;
    errorCode: string;
}
export class TransferHubNotApprovedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubNotApprovedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferHubNotApprovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferHubAccountNotFoundFailedEvtPayload = {
    transferId: string;
    errorCode: string;
}
export class TransferHubAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferHubAccountNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferHubAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerPositionAccountNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerPositionAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerPositionAccountNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerPositionAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerLiquidityAccountNotFoundFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerLiquidityAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerLiquidityAccountNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerLiquidityAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeePositionAccountNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeePositionAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeePositionAccountNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeePositionAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeeLiquidityAccountNotFoundFailedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeeLiquidityAccountNotFoundFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeLiquidityAccountNotFoundFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeeLiquidityAccountNotFoundFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerIdMismatchEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerIdMismatchEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerIdMismatchEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerIdMismatchEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerNotActiveEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerNotActiveEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNotActiveEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerNotActiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerNotApprovedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayerNotApprovedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNotApprovedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerNotApprovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeeIdMismatchEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeeIdMismatchEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeIdMismatchEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeeIdMismatchEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeeNotActiveEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeeNotActiveEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeNotActiveEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeeNotActiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayeeNotApprovedEvtPayload = {
    payeeFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferPayeeNotApprovedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayeeNotApprovedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayeeNotApprovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToGetSettlementModelEvtPayload = {
    transferId: string;
    amount: string;
    payerCurrency: string;
    payeeCurrency: string;
    errorCode: string
}
export class TransferUnableToGetSettlementModelEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToGetSettlementModelEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToGetSettlementModelEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferSettlementModelNotFoundEvtPayload = {
    transferId: string;
    amount: string;
    payerCurrency: string;
    payeeCurrency: string;
    errorCode: string
}
export class TransferSettlementModelNotFoundEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferSettlementModelNotFoundEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferSettlementModelNotFoundEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferPayerNetDebitCapCurrencyNotFoundEvtPayload = {
    transferId: string;
    payerFspId: string;
    currencyCode: string;
    errorCode: string
}
export class TransferPayerNetDebitCapCurrencyNotFoundEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferPayerNetDebitCapCurrencyNotFoundEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferPayerNetDebitCapCurrencyNotFoundEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToDeleteTransferReminderEvtPayload = {
    transferId: string;
    errorCode: string
}
export class TransferUnableToDeleteTransferReminderEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToDeleteTransferReminderEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToDeleteTransferReminderEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type TransferUnableCreateReminderEvtPayload = {
    transferId: string;
    errorCode: string
}
export class TransferUnableCreateReminderEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableCreateReminderEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableCreateReminderEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferBCUnableToAddBulkTransferToDatabaseEvtPayload = {
    bulkTransferId: string;
    errorCode: string;
}
export class TransferBCUnableToAddBulkTransferToDatabaseEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferBCUnableToAddBulkTransferToDatabaseEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferBCUnableToAddBulkTransferToDatabaseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkTransferId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferUnableToGetBulkTransferByIdEvtPayload = {
    bulkTransferId: string;
    errorCode: string;
}
export class TransferUnableToGetBulkTransferByIdEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferUnableToGetBulkTransferByIdEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferUnableToGetBulkTransferByIdEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type BulkTransferNotFoundEvtPayload = {
    bulkTransferId: string;
    errorCode: string;
}
export class BulkTransferNotFoundEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: BulkTransferNotFoundEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: BulkTransferNotFoundEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransfersBCUnknownErrorPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransfersBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransfersBCUnknownErrorPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransfersBCUnknownErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransfersBCOperatorErrorPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}

export class TransfersBCOperatorErrorEvent extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainErrors;
    payload: TransfersBCOperatorErrorPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransfersBCOperatorErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferFulfilmentValidationFailedEvtPayload = {
    payerFspId: string;
    transferId: string;
    errorCode: string;
}
export class TransferFulfilmentValidationFailedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferFulfilmentValidationFailedEvtPayload;

    isErrorEvent: boolean = true;

    constructor (payload: TransferFulfilmentValidationFailedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}
