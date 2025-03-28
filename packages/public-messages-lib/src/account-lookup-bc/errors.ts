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
import { ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME, ACCOUNT_LOOKUP_AGGREGATE_NAME, AccountLookupBCTopics } from ".";

export type AccountLookupBCInvalidMessageErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    requesterFspId: string | null;
    errorCode: string;
}

export class AccountLookupBCInvalidMessagePayloadErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCInvalidMessageErrorPayload;

    constructor (payload: AccountLookupBCInvalidMessageErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void{
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCInvalidMessageTypeErrorPayload = {
    requesterFspId: string | null;
    partyId: string;
    partyType: string;
    partySubType: string;
    errorCode: string;
}

export class AccountLookupBCInvalidMessageTypeErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCInvalidMessageTypeErrorPayload;

    constructor (payload: AccountLookupBCInvalidMessageTypeErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCUnableToAssociateParticipantErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspIdToAssociate: string | null;
    currency: string | null;
    errorCode: string;
}

export class AccountLookupBCUnableToAssociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCUnableToAssociateParticipantErrorPayload;

    constructor (payload: AccountLookupBCUnableToAssociateParticipantErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCUnableToDisassociateParticipantErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspIdToDisassociate: string | null;
    currency: string | null;
    errorCode: string;
}

export class AccountLookupBCUnableToDisassociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCUnableToDisassociateParticipantErrorPayload;

    constructor (payload: AccountLookupBCUnableToDisassociateParticipantErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type AccountLookupBCUnableToGetOracleAdapterErrorPayload = {
    partyId: string;
    partyType: string | null;
    currency: string | null;
    errorCode: string;
}

export class AccountLookupBCUnableToGetOracleAdapterErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCUnableToGetOracleAdapterErrorPayload;

    constructor (payload: AccountLookupBCUnableToGetOracleAdapterErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type AccountLookUpUnableToGetParticipantFromOracleErrorPayload = {
    partyId: string;
    partySubType: string | null;
    partyType: string | null;
    currency: string | null;
    errorCode: string;
}

export class AccountLookUpUnableToGetParticipantFromOracleErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookUpUnableToGetParticipantFromOracleErrorPayload;

    constructor (payload: AccountLookUpUnableToGetParticipantFromOracleErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type AccountLookupBCDestinationParticipantNotFoundErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    errorCode: string;
}

export class AccountLookupBCDestinationParticipantNotFoundErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCDestinationParticipantNotFoundErrorPayload;

    constructor (payload: AccountLookupBCDestinationParticipantNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCInvalidDestinationParticipantErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    errorCode: string;
}

export class AccountLookupBCInvalidDestinationParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCInvalidDestinationParticipantErrorPayload;

    constructor (payload: AccountLookupBCInvalidDestinationParticipantErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequesterParticipantNotFoundErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    requesterFspId: string | null;
    errorCode: string;
}

export class AccountLookupBCRequesterParticipantNotFoundErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCRequesterParticipantNotFoundErrorPayload;

    constructor (payload: AccountLookupBCRequesterParticipantNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCInvalidRequesterParticipantErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    requesterFspId: string | null;
    errorCode: string;
}

export class AccountLookupBCInvalidRequesterParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCInvalidRequesterParticipantErrorPayload;

    constructor (payload: AccountLookupBCInvalidRequesterParticipantErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type AccountLookUpUnknownErrorPayload = {
    partyId: string;
    partyType: string | null;
    requesterFspId: string | null;
    currency: string | null;
    errorCode: string;
}

export class AccountLookUpUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookUpUnknownErrorPayload;

    constructor (payload: AccountLookUpUnknownErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


export type AccountLookUpBCOperatorErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    currency: string | null;
    errorCode: string;
}


export class AccountLookUpBCOperatorErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainErrors;
    payload: AccountLookUpBCOperatorErrorPayload;

    constructor (payload: AccountLookUpBCOperatorErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequiredDestinationParticipantIdMismatchErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    errorCode: string;
}


export class AccountLookupBCRequiredDestinationParticipantIdMismatchErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookupBCRequiredDestinationParticipantIdMismatchErrorPayload;

    constructor (payload: AccountLookupBCRequiredDestinationParticipantIdMismatchErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequiredRequesterParticipantIdMismatchErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    requesterFspId: string | null;
    errorCode: string;
}


export class AccountLookupBCRequiredRequesterParticipantIdMismatchErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookupBCRequiredRequesterParticipantIdMismatchErrorPayload;

    constructor (payload: AccountLookupBCRequiredRequesterParticipantIdMismatchErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequiredDestinationParticipantIsNotActiveErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    errorCode: string;
}


export class AccountLookupBCRequiredDestinationParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookupBCRequiredDestinationParticipantIsNotActiveErrorPayload;

    constructor (payload: AccountLookupBCRequiredDestinationParticipantIsNotActiveErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequiredRequesterParticipantIsNotActiveErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    requesterFspId: string | null;
    errorCode: string;
}


export class AccountLookupBCRequiredRequesterParticipantIsNotActiveErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookupBCRequiredRequesterParticipantIsNotActiveErrorPayload;

    constructor (payload: AccountLookupBCRequiredRequesterParticipantIsNotActiveErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequiredDestinationParticipantIsNotApprovedErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    errorCode: string;
}


export class AccountLookupBCRequiredDestinationParticipantIsNotApprovedErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookupBCRequiredDestinationParticipantIsNotApprovedErrorPayload;

    constructor (payload: AccountLookupBCRequiredDestinationParticipantIsNotApprovedErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type AccountLookupBCRequiredRequesterParticipantIsNotApprovedErrorPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    requesterFspId: string | null;
    errorCode: string;
}


export class AccountLookupBCRequiredRequesterParticipantIsNotApprovedErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: AccountLookupBCRequiredRequesterParticipantIsNotApprovedErrorPayload;

    constructor (payload: AccountLookupBCRequiredRequesterParticipantIsNotApprovedErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}


