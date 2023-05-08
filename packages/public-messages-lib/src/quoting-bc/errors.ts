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
    fspId: string;
    quoteId: string;
    errorDescription: string;
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
        // NOT IMPLEMENTED
    }
}

export type QuoteBCQuoteNotFoundErrorPayload = {
    fspId: string;
    quoteId: string;
    errorDescription: string;
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
        // NOT IMPLEMENTED
    }
}

// BulkQuotes
export type QuoteBCBulkQuoteNotFoundErrorPayload = {
    fspId: string;
    bulkQuoteId: string;
    errorDescription: string;
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
        // NOT IMPLEMENTED
    }
}

// General
export type QuoteBCInvalidMessagePayloadErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
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
        // NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidMessageTypeErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
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
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type QuoteBCParticipantNotFoundErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
}

export class QuoteBCParticipantNotFoundErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCParticipantNotFoundErrorPayload;

    constructor (payload: QuoteBCParticipantNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidParticipantIdErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
}

export class QuoteBCInvalidParticipantIdErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCInvalidParticipantIdErrorPayload;

    constructor (payload: QuoteBCInvalidParticipantIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type QuoteBCRequiredParticipantIsNotActiveErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
}

export class QuoteBCRequiredParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCRequiredParticipantIsNotActiveErrorPayload;

    constructor (payload: QuoteBCRequiredParticipantIsNotActiveErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidRequesterFspIdErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
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
        // NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidDestinationFspIdErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
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
        // NOT IMPLEMENTED
    }
}

export type QuoteBCInvalidDestinationPartyInformationErrorPayload = {
    fspId: string;
    destinationFspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
}

export class QuoteBCInvalidDestinationPartyInformationErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = QUOTING_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: QuoteBCInvalidDestinationPartyInformationErrorPayload;

    constructor (payload: QuoteBCInvalidDestinationPartyInformationErrorPayload) {
        super();
        this.aggregateId = this.msgKey = (payload.bulkQuoteId ?? payload.quoteId) as string;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type QuoteBCUnknownErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
}
export class QuoteBCUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}

export type QuoteBCOperatorErrorPayload = {
    fspId: string;
    quoteId: string | null;
    bulkQuoteId: string | null;
    errorDescription: string;
}

export class QuoteBCOperatorErrorEvent extends DomainEventMsg {
    boundedContextName: string = QUOTING_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}
