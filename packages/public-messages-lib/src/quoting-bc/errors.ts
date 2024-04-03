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
import { QuotingBCTopics, QUOTING_AGGREGATE_NAME, QUOTING_BOUNDED_CONTEXT_NAME } from ".";

// Quotes

export type QuoteBCDuplicateQuoteErrorPayload = {
    quoteId: string;
    errorCode: string;
}

export class QuoteBCDuplicateQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCDuplicateQuoteErrorPayload;

    constructor (payload: QuoteBCDuplicateQuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCQuoteNotFoundErrorPayload = {
    quoteId: string;
    errorCode: string;
}

export class QuoteBCQuoteNotFoundErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCQuoteNotFoundErrorPayload;

    constructor (payload: QuoteBCQuoteNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

// BulkQuotes
export type QuoteBCBulkQuoteNotFoundErrorPayload = {
    bulkQuoteId: string;
    errorCode: string;
}

export class QuoteBCBulkQuoteNotFoundErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCBulkQuoteNotFoundErrorPayload;

    constructor (payload: QuoteBCBulkQuoteNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.bulkQuoteId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

// General
export type QuoteBCInvalidMessagePayloadErrorPayload = {
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
    requesterFspId: string;
}

export class QuoteBCInvalidMessagePayloadErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCInvalidMessagePayloadErrorPayload;

    constructor (payload: QuoteBCInvalidMessagePayloadErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidMessageTypeErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}
export class QuoteBCInvalidMessageTypeErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCInvalidMessageTypeErrorPayload;

    constructor (payload: QuoteBCInvalidMessageTypeErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.requesterFspId ?? payload.requesterFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCDestinationParticipantNotFoundErrorPayload = {
    destinationFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}

export class QuoteBCDestinationParticipantNotFoundErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCDestinationParticipantNotFoundErrorPayload;

    constructor (payload: QuoteBCDestinationParticipantNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.destinationFspId ?? payload.destinationFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequesterParticipantNotFoundErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}

export class QuoteBCRequesterParticipantNotFoundErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequesterParticipantNotFoundErrorPayload;

    constructor (payload: QuoteBCRequesterParticipantNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.requesterFspId ?? payload.requesterFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredDestinationParticipantIdMismatchErrorPayload = {
    destinationFspId: string;
    errorCode: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuoteBCRequiredDestinationParticipantIdMismatchErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredDestinationParticipantIdMismatchErrorPayload;

    constructor (payload: QuoteBCRequiredDestinationParticipantIdMismatchErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.destinationFspId ?? payload.destinationFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredRequesterParticipantIdMismatchErrorPayload = {
    requesterFspId: string;
    errorCode: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuoteBCRequiredRequesterParticipantIdMismatchErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredRequesterParticipantIdMismatchErrorPayload;

    constructor (payload: QuoteBCRequiredRequesterParticipantIdMismatchErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.requesterFspId ?? payload.requesterFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredDestinationParticipantIsNotApprovedErrorPayload = {
    destinationFspId: string;
    errorCode: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuoteBCRequiredDestinationParticipantIsNotApprovedErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredDestinationParticipantIsNotApprovedErrorPayload;

    constructor (payload: QuoteBCRequiredDestinationParticipantIsNotApprovedErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.destinationFspId ?? payload.destinationFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredRequesterParticipantIsNotApprovedErrorPayload = {
    requesterFspId: string;
    errorCode: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuoteBCRequiredRequesterParticipantIsNotApprovedErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredRequesterParticipantIsNotApprovedErrorPayload;

    constructor (payload: QuoteBCRequiredRequesterParticipantIsNotApprovedErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.requesterFspId ?? payload.requesterFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredDestinationParticipantIsNotActiveErrorPayload = {
    destinationFspId: string;
    errorCode: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuoteBCRequiredDestinationParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredDestinationParticipantIsNotActiveErrorPayload;

    constructor (payload: QuoteBCRequiredDestinationParticipantIsNotActiveErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.destinationFspId ?? payload.destinationFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredRequesterParticipantIsNotActiveErrorPayload = {
    requesterFspId: string;
    errorCode: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuoteBCRequiredRequesterParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredRequesterParticipantIsNotActiveErrorPayload;

    constructor (payload: QuoteBCRequiredRequesterParticipantIsNotActiveErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.requesterFspId ?? payload.requesterFspId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidRequesterFspIdErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}

export class QuoteBCInvalidRequesterFspIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCInvalidRequesterFspIdErrorPayload;

    constructor (payload: QuoteBCInvalidRequesterFspIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidDestinationFspIdErrorPayload = {
    destinationFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}

export class QuoteBCInvalidDestinationFspIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCInvalidDestinationFspIdErrorPayload;

    constructor (payload: QuoteBCInvalidDestinationFspIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCUnknownErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}
export class QuoteBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCUnknownErrorPayload;

    constructor (payload: QuoteBCUnknownErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCOperatorErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorCode: string;
}

export class QuoteBCOperatorErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainErrors;
    payload: QuoteBCOperatorErrorPayload;

    constructor (payload: QuoteBCOperatorErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCQuoteExpiredErrorPayload = {
    quoteId: string;
    expirationDate: string;
    errorCode: string;
}

export class QuoteBCQuoteExpiredErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCQuoteExpiredErrorPayload;

    constructor (payload: QuoteBCQuoteExpiredErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCBulkQuoteExpiredErrorPayload = {
    bulkQuoteId: string;
    expirationDate: string;
    errorCode: string;
}

export class QuoteBCBulkQuoteExpiredErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCBulkQuoteExpiredErrorPayload;

    constructor (payload: QuoteBCBulkQuoteExpiredErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCUnableToAddQuoteToDatabaseErrorPayload = {
    quoteId: string;
    errorCode: string;
}

export class QuoteBCUnableToAddQuoteToDatabaseErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCUnableToAddQuoteToDatabaseErrorPayload;

    constructor (payload: QuoteBCUnableToAddQuoteToDatabaseErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type QuoteBCUnableToAddBulkQuoteToDatabaseErrorPayload = {
    bulkQuoteId: string;
    errorCode: string;
}
export class QuoteBCUnableToAddBulkQuoteToDatabaseErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCUnableToAddBulkQuoteToDatabaseErrorPayload;

    constructor (payload: QuoteBCUnableToAddBulkQuoteToDatabaseErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCUnableToUpdateQuoteInDatabaseErrorPayload = {
    quoteId: string;
    errorCode: string;
}

export class QuoteBCUnableToUpdateQuoteInDatabaseErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCUnableToUpdateQuoteInDatabaseErrorPayload;

    constructor (payload: QuoteBCUnableToUpdateQuoteInDatabaseErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCUnableToUpdateBulkQuoteInDatabaseErrorPayload = {
    bulkQuoteId: string;
    errorCode: string;
}

export class QuoteBCUnableToUpdateBulkQuoteInDatabaseErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCUnableToUpdateBulkQuoteInDatabaseErrorPayload;

    constructor (payload: QuoteBCUnableToUpdateBulkQuoteInDatabaseErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidBulkQuoteLengthErrorPayload = {
    bulkQuoteId: string;
    errorCode: string;
}

export class QuoteBCInvalidBulkQuoteLengthErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    msgKey: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCInvalidBulkQuoteLengthErrorPayload;

    constructor (payload: QuoteBCInvalidBulkQuoteLengthErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCQuoteRuleSchemeViolatedRequestErrorPayload = {
    quoteId: string;
    errorCode: string;
}

export class QuoteBCQuoteRuleSchemeViolatedRequestErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    msgKey: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCQuoteRuleSchemeViolatedRequestErrorPayload;

    constructor (payload: QuoteBCQuoteRuleSchemeViolatedRequestErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type QuoteBCQuoteRuleSchemeViolatedResponseErrorPayload = {
    quoteId: string;
    errorCode: string;
}

export class QuoteBCQuoteRuleSchemeViolatedResponseErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    msgKey: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteBCQuoteRuleSchemeViolatedResponseErrorPayload;

    constructor (payload: QuoteBCQuoteRuleSchemeViolatedResponseErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}