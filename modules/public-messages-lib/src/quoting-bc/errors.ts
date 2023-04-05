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

export type QuoteErrorPayload = {
    errorMessage: string;
    requesterFspId: string | null;
    destinationFspId: string | null;
    quoteId: string;
    sourceEvent: string;
}

// Quote
export class QuotingBCInvalidIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCDuplicateQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCNoSuchQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

// BulkQuotes
export class QuotingBCNoSuchBulkQuoteErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}


export class QuotingBCInvalidMessagePayloadErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCInvalidMessageTypeErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCUnableToProcessMessageErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCNoSuchParticipantErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCInvalidParticipantIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCRequiredParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCInvalidRequesterFspIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCInvalidDestinationFspIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCInvalidDestinationPartyInformationErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;

    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

export class QuotingBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteErrorPayload;

    constructor (payload: QuoteErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }
}

