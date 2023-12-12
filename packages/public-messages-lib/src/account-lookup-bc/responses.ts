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

export type ParticipantAssociationCreatedEvtPayload = {
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
}

export class ParticipantAssociationCreatedEvt extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: ParticipantAssociationCreatedEvtPayload;

    constructor (payload: ParticipantAssociationCreatedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { partyId } = this.payload;
		if (!partyId) {
            throw new Error("partyId is required.");
		}
     }
}

export type ParticipantAssociationRemovedEvtPayload = {
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
}

export class ParticipantAssociationRemovedEvt extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: ParticipantAssociationRemovedEvtPayload;

    constructor (payload: ParticipantAssociationRemovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { partyId } = this.payload;
		if (!partyId) {
            throw new Error("partyId is required.");
		}
     }
}


export type ParticipantQueryResponseEvtPayload = {
    requesterFspId: string;
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;            // optional currency, ISO format
}

export class ParticipantQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: ParticipantQueryResponseEvtPayload;

    constructor (payload: ParticipantQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { requesterFspId, ownerFspId, partyId, partyType } = this.payload;

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
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: PartyInfoRequestedEvtPayload;

    constructor (payload: PartyInfoRequestedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { requesterFspId, destinationFspId, partyId, partyType } = this.payload;

        if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}
		if (!destinationFspId) {
            throw new Error("destinationFspId is required.");
		}
		if (!partyId) {
            throw new Error("partyId is required.");
		}
        if (!partyType) {
            throw new Error("partyType is required.");
		}
    }
}



export type PartyQueryResponseEvtPayload = {
    requesterFspId: string;
    ownerFspId: string;
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;            // optional currency, ISO format
    destinationFspId: string,
    // actual party info
    merchantClassificationCode: string;
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    partyDoB: Date | null;
    extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class PartyQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
    payload: PartyQueryResponseEvtPayload;

    constructor (payload: PartyQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.partyId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { requesterFspId, ownerFspId, partyId, partyType } = this.payload;

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
    }
}


export type GetPartyQueryRejectedResponseEvtPayload = {
    partyId: string;
    partyType: string;
    partySubType: string | null;
    currency: string | null;
	errorInformation: {
		errorCode: string;
		errorDescription: string;
	}
}
export class GetPartyQueryRejectedResponseEvt extends DomainEventMsg {
    boundedContextName: string = ACCOUNT_LOOKUP_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = ACCOUNT_LOOKUP_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = AccountLookupBCTopics.DomainEvents;
	payload: GetPartyQueryRejectedResponseEvtPayload;

	constructor(payload: GetPartyQueryRejectedResponseEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.partyId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}