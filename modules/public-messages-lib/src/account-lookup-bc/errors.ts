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

export type AccountLookupErrorPayload = {
    errorMessage: string;
    partyId: string;
}

export class AccountLookupBCInvalidMessagePayloadErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCInvalidMessageTypeErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCUnableToAssociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCUnableToDisassociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCNoSuchParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCInvalidParticipantIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCUnableToGetOracleFromOracleFinderErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCNoSuchOracleErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCNoSuchOracleAdapterErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}

export class AccountLookupBCUnableToGetParticipantFspIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}


export class AccountLookupBCNoSuchParticipantFspIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: AccountLookupErrorPayload;

    constructor (payload: AccountLookupErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }
}




