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
import { BOUNDED_CONTEXT_NAME, AGGREGATE_NAME, AccountLookupBCTopics } from ".";

export type ParticipantAssociationRequestReceivedEvtPayload = {
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
}

export class ParticipantAssociationRequestReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: ParticipantAssociationRequestReceivedEvtPayload;

    constructor (payload: ParticipantAssociationRequestReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { ownerFspId, partyId, partyType } = this.payload;

		if (!ownerFspId) {
            throw new Error("ownerFspId is required.");
		}
		if (!partyId) {
            throw new Error("partyId is required.");
		}
        if (!partyType) {
            throw new Error("partyType is required.");
		}
    }
}


export type ParticipantDisassociateRequestReceivedEvtPayload = {
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
}

export class ParticipantDisassociateRequestReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: ParticipantDisassociateRequestReceivedEvtPayload;

    constructor (payload: ParticipantDisassociateRequestReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { ownerFspId, partyId, partyType } = this.payload;

		if (!ownerFspId) {
            throw new Error("ownerFspId is required.");
		}
		if (!partyId) {
            throw new Error("partyId is required.");
		}
        if (!partyType) {
            throw new Error("partyType is required.");
		}
    }
}

export type ParticipantQueryReceivedEvtPayload = {
    requesterFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;            // optional currency, ISO format
}

export class ParticipantQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;
    payload: ParticipantQueryReceivedEvtPayload;

    constructor (payload: ParticipantQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { requesterFspId, partyId, partyType } = this.payload;

		if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}
		if (!partyId) {
            throw new Error("partyId is required.");
		}
        if (!partyType) {
            throw new Error("partyType is required.");
		}
    }
}


export type PartyQueryReceivedEvtPayload = {
    requesterFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    currency: string | null;            // optional currency, ISO format
}

export class PartyQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;

    payload: PartyQueryReceivedEvtPayload;

    constructor (payload: PartyQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { requesterFspId, partyId, partyType } = this.payload;

		if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}
		if (!partyId) {
            throw new Error("partyId is required.");
		}
        if (!partyType) {
            throw new Error("partyType is required.");
		}
    }
}

export type PartyInfoAvailableEvtPayload = {
    requesterFspId: string;
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    destinationFspId: string | null;
    currency: string | null;            // optional currency, ISO format
    // actual party info
    partyName: string;
    partyDoB: Date | null;
}

export class PartyInfoAvailableEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainRequests;
    payload: PartyInfoAvailableEvtPayload;

    constructor (payload: PartyInfoAvailableEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { requesterFspId, ownerFspId, partyId, partyType, partyName } = this.payload;

		if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}
        if (!ownerFspId) {
            throw new Error("ownerFspId is required.");
        }
		if (!partyId) {
            throw new Error("partyId is required.");
		}
        if (!partyType) {
            throw new Error("partyType is required.");
		}
        if (!partyName) {
            throw new Error("partyName is required.");
		}
     }
}
