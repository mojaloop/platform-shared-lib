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
import { ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME, ACCOUNT_LOOKUP_AGGREGATE_NAME, AccountLookupBCTopics } from ".";

export type AccountLookupInvalidMessagePayloadErrorEventPayload = {
    errorMessage: string;
}

export class AccountLookupInvalidMessagePayloadErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupInvalidMessagePayloadErrorEventPayload;

    constructor (payload: AccountLookupInvalidMessagePayloadErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupInvalidMessageTypeErrorEventPayload = {
    errorMessage: string;
}

export class AccountLookupInvalidMessageTypeErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupInvalidMessageTypeErrorEventPayload;

    constructor (payload: AccountLookupInvalidMessageTypeErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupUnableToAssociateParticipantErrorEventPayload = {
    errorMessage: string;
    partyId: string | null;
    partyType: string | null;
    currency: string | null;
}

export class AccountLookupUnableToAssociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupUnableToAssociateParticipantErrorEventPayload;

    constructor (payload: AccountLookupUnableToAssociateParticipantErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupUnableToDisassociateParticipantErrorEventPayload = {
    errorMessage: string;
    partyId: string | null;
    partyType: string | null;
    currency: string | null;
}

export class AccountLookupUnableToDisassociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupUnableToDisassociateParticipantErrorEventPayload;

    constructor (payload: AccountLookupUnableToDisassociateParticipantErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupNoSuchParticipantErrorEventPayload = {
    errorMessage: string;
    participantId: string | null;
}

export class AccountLookupNoSuchParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupNoSuchParticipantErrorEvent;

    constructor (payload: AccountLookupNoSuchParticipantErrorEvent) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupInvalidParticipantIdErrorEventPayload = {
    errorMessage: string;
    participantId: string | null;
}

export class AccountLookupInvalidParticipantIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupInvalidParticipantIdErrorEventPayload;

    constructor (payload: AccountLookupInvalidParticipantIdErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupUnableToGetOracleFromOracleFinderErrorEventPayload = {
    errorMessage: string;
    partyType: string | null;
}

export class AccountLookupUnableToGetOracleFromOracleFinderErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupUnableToGetOracleFromOracleFinderErrorEventPayload;

    constructor (payload: AccountLookupUnableToGetOracleFromOracleFinderErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupNoSuchOracleErrorEventPayload = {
    errorMessage: string;
    oracleId: string | null;
}

export class AccountLookupNoSuchOracleErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupNoSuchOracleErrorEventPayload;

    constructor (payload: AccountLookupNoSuchOracleErrorEventPayload) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupNoSuchOracleAdapterErrorEventPayload = {
    errorMessage: string;
    oracleId: string | null;
}

export class AccountLookupNoSuchOracleAdapterErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupNoSuchOracleAdapterErrorEvent;

    constructor (payload: AccountLookupNoSuchOracleAdapterErrorEvent) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}

export type AccountLookupUnableToGetParticipantFspIdErrorEventPayload = {
    errorMessage: string;
    partyType: string | null;
    partyId: string | null;
    currency: string | null;
}

export class AccountLookupUnableToGetParticipantFspIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupUnableToGetParticipantFspIdErrorEvent;

    constructor (payload: AccountLookupUnableToGetParticipantFspIdErrorEvent) {
        super();
        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}



export type AccountLookupNoSuchParticipantFspIdErrorEventPayload = {
    errorMessage: string;
    partyType: string | null;
    partyId: string | null;
    currency: string | null;
}

export class AccountLookupNoSuchParticipantFspIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupNoSuchParticipantFspIdErrorEvent;

    constructor (payload: AccountLookupNoSuchParticipantFspIdErrorEvent) {
        super();

        this.aggregateId = this.msgKey;
        this.payload = payload;
    }
}




