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

"use strict";

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {TRANSFERS_BOUNDED_CONTEXT_NAME, TRANSFERS_AGGREGATE_NAME, TransfersBCTopics} from ".";


export type TransferPreparedEvtPayload = {
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

export class TransferPreparedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainEvents;
	payload: TransferPreparedEvtPayload;

	constructor(payload: TransferPreparedEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type TransferCommittedFulfiledEvtPayload = {
	transferId: string;
	transferState: "PENDING" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "REJECTED",
	fulfilment: number | null,
	completedTimestamp: number | null,
	extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;

	// for settlements
	payeeFspId: string;
	payerFspId: string;
	amount: string;
	currencyCode: string;
	settlementModel: string;
}

export class TransferCommittedFulfiledEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainEvents;
	payload: TransferCommittedFulfiledEvtPayload;

	constructor(payload: TransferCommittedFulfiledEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type TransferRejectRequestProcessedEvtPayload = {
	transferId: string;
	errorInformation: {
		errorCode: string;
		errorDescription: string;
	}
}

export class TransferRejectRequestProcessedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainEvents;
	payload: TransferRejectRequestProcessedEvtPayload;

	constructor(payload: TransferRejectRequestProcessedEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}
