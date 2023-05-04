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

export type AccountLookupBCInvalidMessageErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCInvalidMessagePayloadErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCInvalidMessageTypeErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCInvalidMessageTypeErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCUnableToAssociateParticipantErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCUnableToAssociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCUnableToDisassociateParticipantErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCUnableToDisassociateParticipantErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCParticipantNotFoundErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCParticipantNotFoundErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCParticipantNotFoundErrorPayload;

    constructor (payload: AccountLookupBCParticipantNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCInvalidParticipantIdErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCInvalidParticipantIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCInvalidParticipantIdErrorPayload;

    constructor (payload: AccountLookupBCInvalidParticipantIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCUnableToGetOracleFromOracleFinderErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCUnableToGetOracleFromOracleFinderErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCUnableToGetOracleFromOracleFinderErrorPayload;

    constructor (payload: AccountLookupBCUnableToGetOracleFromOracleFinderErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCOracleNotFoundErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCOracleNotFoundErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCOracleNotFoundErrorPayload;

    constructor (payload: AccountLookupBCOracleNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCOracleAdapterNotFoundErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCOracleAdapterNotFoundErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCOracleAdapterNotFoundErrorPayload;

    constructor (payload: AccountLookupBCOracleAdapterNotFoundErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCUnableToGetParticipantFspIdErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCUnableToGetParticipantFspIdErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCUnableToGetParticipantFspIdErrorPayload;

    constructor (payload: AccountLookupBCUnableToGetParticipantFspIdErrorPayload) {
        super();
        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookupBCParticipantFspIdNotFoundErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookupBCParticipantFspIdNotFoundErrorEvent extends DomainEventMsg   {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;

    payload: AccountLookupBCParticipantFspIdNotFoundErrorPayload;

    constructor (payload: AccountLookupBCParticipantFspIdNotFoundErrorPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type AccountLookUpUnknownErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}

export class AccountLookUpUnknownErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}


export type AccountLookUpBCOperatorErrorPayload = {
    partyId: string;
    partyType: string | null;
    fspId: string | null;
    partySubType: string | null;
    errorDescription: string;
}


export class AccountLookUpBCOperatorErrorEvent extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME
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
        // NOT IMPLEMENTED
    }
}


