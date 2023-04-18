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
export type QuotingBCInvalidIdErrorPayload = {
    requesterFspId: string;
    quoteId: string;
}

export class QuotingBCInvalidIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidIdErrorPayload;

    constructor (payload: QuotingBCInvalidIdErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}


export type QuotingBCDuplicateQuoteErrorPayload = {
    requesterFspId: string;
    quoteId: string;
}

export class QuotingBCDuplicateQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCDuplicateQuoteErrorPayload;

    constructor (payload: QuotingBCDuplicateQuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export type QuotingBCNoSuchQuoteErrorPayload = {
    requesterFspId: string;
    quoteId: string;
}
export class QuotingBCNoSuchQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCNoSuchQuoteErrorPayload;

    constructor (payload: QuotingBCNoSuchQuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

// BulkQuotes
export type QuotingBCNoSuchBulkQuoteErrorPayload = {
    requesterFspId: string;
    bulkQuoteId: string;
}

export class QuotingBCNoSuchBulkQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCNoSuchBulkQuoteErrorPayload;

    constructor (payload: QuotingBCNoSuchBulkQuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.bulkQuoteId;
        this.payload = payload;
    }
}

// General
export type QuotingBCInvalidMessagePayloadErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCInvalidMessagePayloadErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidMessagePayloadErrorPayload;

    constructor (payload: QuotingBCInvalidMessagePayloadErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCInvalidMessageTypeErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuotingBCInvalidMessageTypeErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidMessageTypeErrorPayload;

    constructor (payload: QuotingBCInvalidMessageTypeErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCUnableToProcessMessageErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCUnableToProcessMessageErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCUnableToProcessMessageErrorPayload;

    constructor (payload: QuotingBCUnableToProcessMessageErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCNoSuchParticipantErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCNoSuchParticipantErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCNoSuchParticipantErrorPayload;

    constructor (payload: QuotingBCNoSuchParticipantErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCInvalidParticipantIdErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCInvalidParticipantIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidParticipantIdErrorPayload;

    constructor (payload: QuotingBCInvalidParticipantIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCRequiredParticipantIsNotActiveErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCRequiredParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCRequiredParticipantIsNotActiveErrorPayload;

    constructor (payload: QuotingBCRequiredParticipantIsNotActiveErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCInvalidRequesterFspIdErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCInvalidRequesterFspIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidRequesterFspIdErrorPayload;

    constructor (payload: QuotingBCInvalidRequesterFspIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCInvalidDestinationFspIdErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCInvalidDestinationFspIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidDestinationFspIdErrorPayload;

    constructor (payload: QuotingBCInvalidDestinationFspIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCInvalidDestinationPartyInformationErrorPayload = {
    requesterFspId: string;
    destinationFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}

export class QuotingBCInvalidDestinationPartyInformationErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuotingBCInvalidDestinationPartyInformationErrorPayload;

    constructor (payload: QuotingBCInvalidDestinationPartyInformationErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

export type QuotingBCUnknownErrorPayload = {
    requesterFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
}
export class QuotingBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuotingBCUnknownErrorPayload;

    constructor (payload: QuotingBCUnknownErrorPayload) {
        super();

        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }
}

