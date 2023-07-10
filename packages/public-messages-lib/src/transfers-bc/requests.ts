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

 --------------
 ******/

"use strict"

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { TRANSFERS_BOUNDED_CONTEXT_NAME, TRANSFERS_AGGREGATE_NAME, TransfersBCTopics } from ".";


export type TransferPrepareRequestedEvtPayload = {
	transferId: string;
	payeeFsp: string;
	payerFsp: string;
	amount: string;
	currencyCode: string;
	ilpPacket: string;
	condition: string;
	expiration: number;
	extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class TransferPrepareRequestedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainRequests;
	payload: TransferPrepareRequestedEvtPayload;

	constructor(payload: TransferPrepareRequestedEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type TransferFulfilCommittedRequestedEvtPayload = {
	transferId: string;
	transferState: "PENDING" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "REJECTED",
	fulfilment: string | null,
	completedTimestamp: number,
	extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class TransferFulfilCommittedRequestedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainRequests;
	payload: TransferFulfilCommittedRequestedEvtPayload;

	constructor(payload: TransferFulfilCommittedRequestedEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type TransferRejectRequestedEvtPayload = {
	transferId: string;
	errorInformation: {
		errorCode: string;
		errorDescription: string;
	}
}

export class TransferRejectRequestedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: TransferRejectRequestedEvtPayload;

    constructor (payload: TransferRejectRequestedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferQueryReceivedEvtPayload = {
	transferId: string;
}

export class TransferQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: TransferQueryReceivedEvtPayload;

    constructor (payload: TransferQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type TransferTimeoutEvtPayload = {
	transferId: string;
}

export class TransferTimeoutEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: TransferTimeoutEvtPayload;

    constructor (payload: TransferTimeoutEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}