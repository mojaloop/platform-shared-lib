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

"use strict"

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { BOUNDED_CONTEXT_NAME, AGGREGATE_NAME, AccountLookupBCTopics, AccountLookupBCEvents } from ".";

export type ParticipantQueryResponseEvtPayload = {
    requesterFspId: string;
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;            // optional currency, ISO format
}

export class ParticipantQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    msgName: string = AccountLookupBCEvents.ParticipantQueryResponse;
    payload: ParticipantQueryResponseEvtPayload;

    constructor (payload: ParticipantQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        throw new Error("Method not implemented.");
     }
}


export type PartyInfoRequestedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string | null;    // the requester might already know who owns the party
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;            // optional currency, ISO format
}

export class PartyInfoRequestedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    msgName: string = AccountLookupBCEvents.PartyInfoRequested;
    payload: PartyInfoRequestedEvtPayload;

    constructor (payload: PartyInfoRequestedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        throw new Error("Method not implemented.");
    }
}



export type PartyQueryResponseEvtPayload = {
    requesterFspId: string;
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;            // optional currency, ISO format

    // actual party info
    partyName: string;
    partyDoB: Date | null;
}

export class PartyQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    msgName: string = AccountLookupBCEvents.PartyQueryResponse;
    payload: PartyQueryResponseEvtPayload;

    constructor (payload: PartyQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        throw new Error("Method not implemented.");
    }
}


export type PartyAssociationCreatedEvtPayload = {
    partyId: string;
}

export class PartyAssociationCreatedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    msgName: string = AccountLookupBCEvents.PartyQueryResponse;
    payload: PartyAssociationCreatedEvtPayload;

    constructor (payload: PartyAssociationCreatedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        throw new Error("Method not implemented.");
    }
}

export type AccountLookUperrorEvtPayload = {
    partyId: string;
    errorMsg: string;
}

export class AccountLookUperrorEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    msgName: string = AccountLookupBCEvents.AccountLookUperror;
    payload: AccountLookUperrorEvtPayload;

    constructor (payload: AccountLookUperrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        throw new Error("Method not implemented.");
    }
}