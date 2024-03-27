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
import { FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME, FOREIGN_EXCHANGE_AGGREGATE_NAME, ForeignExchangeBCQuoteTopics } from "..";

// General
export type FxQuoteInvalidMessagePayloadErrorPayload = {
    conversionRequestId: string | null;
    requesterFspId: string;
    errorDescription: string;
}

export class FxQuoteInvalidMessagePayloadErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteInvalidMessagePayloadErrorPayload;

    constructor (payload: FxQuoteInvalidMessagePayloadErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteInvalidMessageTypeErrorPayload = {
    conversionRequestId: string | null;
    requesterFspId: string;
    errorDescription: string;
}

export class FxQuoteInvalidMessageTypeErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteInvalidMessageTypeErrorPayload;

    constructor (payload: FxQuoteInvalidMessageTypeErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteInvalidRequesterParticipantErrorPayload = {
    conversionRequestId: string | null;
    requesterFspId: string;
    errorDescription: string;
}

export class FxQuoteInvalidRequesterParticipantErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteInvalidRequesterParticipantErrorPayload;

    constructor (payload: FxQuoteInvalidRequesterParticipantErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteInvalidDestinationParticipantErrorPayload = {
    conversionRequestId: string | null;
    destinationFspId: string;
    errorDescription: string;
}

export class FxQuoteInvalidDestinationParticipantErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteInvalidDestinationParticipantErrorPayload;

    constructor (payload: FxQuoteInvalidDestinationParticipantErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.destinationFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteUnknownErrorPayload = {
    requesterFspId: string;
    conversionRequestId: string | null;
    errorDescription: string;
}

export class FxQuoteUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteUnknownErrorPayload;

    constructor (payload: FxQuoteUnknownErrorPayload) {
        super();
        
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteBCQuoteNotFoundErrorEvtPayload = {
    conversionRequestId: string;
    errorDescription: string;
}

export class FxQuoteBCQuoteNotFoundErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteBCQuoteNotFoundErrorEvtPayload;

    constructor (payload: FxQuoteBCQuoteNotFoundErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteDestinationParticipantNotFoundErrorEvtPayload = {
    conversionRequestId: string | null;
    destinationFspId: string;
    errorDescription: string;
}

export class FxQuoteDestinationParticipantNotFoundErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteDestinationParticipantNotFoundErrorEvtPayload;

    constructor (payload: FxQuoteDestinationParticipantNotFoundErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.destinationFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteRequesterParticipantNotFoundErrorEvtPayload = {
    conversionRequestId: string | null;
    requesterFspId: string;
    errorDescription: string;
}

export class FxQuoteRequesterParticipantNotFoundErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteRequesterParticipantNotFoundErrorEvtPayload;

    constructor (payload: FxQuoteRequesterParticipantNotFoundErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteRequiredDestinationParticipantIsNotApprovedErrorEvtPayload = {
    conversionRequestId: string | null;
    destinationFspId: string;
    errorDescription: string;
}

export class FxQuoteRequiredDestinationParticipantIsNotApprovedErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteRequiredDestinationParticipantIsNotApprovedErrorEvtPayload;

    constructor (payload: FxQuoteRequiredDestinationParticipantIsNotApprovedErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.destinationFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteRequiredRequesterParticipantIsNotApprovedErrorEvtPayload = {
    conversionRequestId: string | null;
    requesterFspId: string;
    errorDescription: string;
}

export class FxQuoteRequiredRequesterParticipantIsNotApprovedErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteRequiredRequesterParticipantIsNotApprovedErrorEvtPayload;

    constructor (payload: FxQuoteRequiredRequesterParticipantIsNotApprovedErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteRequiredDestinationParticipantIsNotActiveErrorEvtPayload = {
    conversionRequestId: string | null;
    destinationFspId: string;
    errorDescription: string;
}

export class FxQuoteRequiredDestinationParticipantIsNotActiveErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteRequiredDestinationParticipantIsNotActiveErrorEvtPayload;

    constructor (payload: FxQuoteRequiredDestinationParticipantIsNotActiveErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.destinationFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteRequiredRequesterParticipantIsNotActiveErrorEvtPayload = {
    conversionRequestId: string | null;
    requesterFspId: string;
    errorDescription: string;
}

export class FxQuoteRequiredRequesterParticipantIsNotActiveErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;

    payload: FxQuoteRequiredRequesterParticipantIsNotActiveErrorEvtPayload;

    constructor (payload: FxQuoteRequiredRequesterParticipantIsNotActiveErrorEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.requesterFspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteOperatorErrorEvtPayload = {
    conversionRequestId: string | null;
    fspId: string;
    errorDescription: string;
}

export class FxQuoteOperatorErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainErrors;
    payload: FxQuoteOperatorErrorEvtPayload;

    constructor (payload: FxQuoteOperatorErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId ?? payload.fspId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteBcQuoteExpiredErrorEvtPayload = {
    conversionRequestId: string;
    expirationDate: string;
    errorDescription: string;
}

export class FxQuoteBcQuoteExpiredErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteBcQuoteExpiredErrorEvtPayload;

    constructor (payload: FxQuoteBcQuoteExpiredErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteUnableToAddQuoteToDatabaseErrorEvtPayload = {
    conversionRequestId: string;
    errorDescription: string;
}

export class FxQuoteUnableToAddQuoteToDatabaseErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteUnableToAddQuoteToDatabaseErrorEvtPayload;

    constructor (payload: FxQuoteUnableToAddQuoteToDatabaseErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteUnableToUpdateQuoteToDatabaseErrorEvtPayload = {
    conversionRequestId: string;
    errorDescription: string;
}

export class FxQuoteUnableToUpdateQuoteToDatabaseErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteUnableToUpdateQuoteToDatabaseErrorEvtPayload;

    constructor (payload: FxQuoteUnableToUpdateQuoteToDatabaseErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteBCQuoteRuleSchemeViolatedRequestErrorEvtPayload = {
    conversionRequestId: string;
    errorDescription: string;
}

export class FxQuoteBCQuoteRuleSchemeViolatedRequestErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    msgKey: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteBCQuoteRuleSchemeViolatedRequestErrorEvtPayload;

    constructor (payload: FxQuoteBCQuoteRuleSchemeViolatedRequestErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type FxQuoteBCQuoteRuleSchemeViolatedResponseErrorEvtPayload = {
    conversionRequestId: string;
    errorDescription: string;
}

export class FxQuoteBCQuoteRuleSchemeViolatedResponseErrorEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    msgKey: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainEvents;
    payload: FxQuoteBCQuoteRuleSchemeViolatedResponseErrorEvtPayload;

    constructor (payload: FxQuoteBCQuoteRuleSchemeViolatedResponseErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}