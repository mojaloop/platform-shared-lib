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
	expiration: number;
    settlementModel: string;
    preparedAt: number;
	extensions: {
        key: string;
        value: string;
    }[];
}

export class TransferPreparedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
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

export type TransferFulfiledEvtPayload = {
	transferId: string;
	completedTimestamp: number,
	// for settlements
	payeeFspId: string;
	payerFspId: string;
	amount: string;
	currencyCode: string;
	settlementModel: string;
	notifyPayee: boolean;
    fulfiledAt: number;
	extensions: {
        key: string;
        value: string;
    }[];
}

export class TransferFulfiledEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainEvents;
	payload: TransferFulfiledEvtPayload;

	constructor(payload: TransferFulfiledEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type TransferReserveFulfiledEvtPayload = {
	transferId: string;
	fulfilment: string | null,
	completedTimestamp: number,
	// for settlements
	payeeFspId: string;
	payerFspId: string;
	amount: string;
	currencyCode: string;
	settlementModel: string;
}

export class TransferReserveFulfiledEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainEvents;
	payload: TransferReserveFulfiledEvtPayload;

	constructor(payload: TransferReserveFulfiledEvtPayload) {
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
		extensions: {
			key: string;
			value: string;
		}[];
	}
}

export class TransferRejectRequestProcessedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
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

export type TransferQueryResponseEvtPayload = {
	transferId: string;
	transferState: string;
	completedTimestamp: number | null;
	extensions: {
		key: string;
		value: string;
	}[];
}

export class TransferQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: TransferQueryResponseEvtPayload;

    constructor (payload: TransferQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload (): void {
		// TODO
    }
}

export type BulkTransferPreparedEvtPayload = {
    bulkTransferId: string;
    bulkQuoteId: string;
    payeeFsp: string;
    payerFsp: string;
    expiration: string;
    individualTransfers: {
        transferId: string;
        amount: string;
        currencyCode: string;
    }[];
	extensions: {
		key: string;
		value: string;
	}[];
}

export class BulkTransferPreparedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: BulkTransferPreparedEvtPayload;

    constructor (payload: BulkTransferPreparedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

	validatePayload(): void {
		// TODO
	}
}

export type BulkTransferFulfiledEvtPayload = {
    bulkTransferId: string;
	completedTimestamp: number;
	bulkTransferState: string;
    individualTransferResults: {
        transferId: string;
        fulfilment: string | null;
		extensions: {
			key: string;
			value: string;
		}[];
		errorInformation: {
            errorCode: string;
            errorDescription: string;
            extensions: {
                key: string;
                value: string;
            }[];
        } | null;
    }[];
	extensions: {
		key: string;
		value: string;
	}[];
}

export class BulkTransferFulfiledEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;

    payload: BulkTransferFulfiledEvtPayload;

    constructor (payload: BulkTransferFulfiledEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload (): void {
        // TODO
    }
}


export type BulkTransferRejectRequestProcessedEvtPayload = {
	bulkTransferId: string;
	errorInformation: {
		errorCode: string;
		errorDescription: string;
		extensions: {
			key: string;
			value: string;
		}[];
	}
}

export class BulkTransferRejectRequestProcessedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainEvents;
	payload: BulkTransferRejectRequestProcessedEvtPayload;

	constructor(payload: BulkTransferRejectRequestProcessedEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.bulkTransferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type BulkTransferQueryResponseEvtPayload = {
	bulkTransferId: string;
    completedTimestamp: number | null;
    bulkTransferState: string;
    individualTransferResults: {
        transferId: string;
        errorInformation: {
            errorCode: string;
            errorDescription: string;
			extensions: {
				key: string;
				value: string;
			}[];
        } | null;
    }[];
}

export class BulkTransferQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainEvents;
    payload: BulkTransferQueryResponseEvtPayload;

    constructor (payload: BulkTransferQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload (): void {
		// TODO
    }
}