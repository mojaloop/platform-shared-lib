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
import { TRANSFERS_BOUNDED_CONTEXT_NAME, TRANSFERS_AGGREGATE_NAME, TransfersBCTopics } from ".";


export type TransferPrepareRequestedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
	transferId: string;
	payeeFsp: string;
	payerFsp: string;
	amount: string;
	currencyCode: string;
	expiration: number;
    payerIdType: string;
    payeeIdType: string;
    transferType: string;
    extensions: {
        key: string;
        value: string;
    }[];
}

export class TransferPrepareRequestedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
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

export type TransferFulfilRequestedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
	transferId: string;
	transferState: "PENDING" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "REJECTED",
	completedTimestamp: number,
	notifyPayee: boolean;
    extensions: {
        key: string;
        value: string;
    }[];
}

export class TransferFulfilRequestedEvt extends DomainEventMsg {
	boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
	aggregateId: string;
	aggregateName: string = TRANSFERS_AGGREGATE_NAME;
	msgKey: string;
	msgTopic: string = TransfersBCTopics.DomainRequests;
	payload: TransferFulfilRequestedEvtPayload;

	constructor(payload: TransferFulfilRequestedEvtPayload) {
		super();

		this.aggregateId = this.msgKey = payload.transferId;
		this.payload = payload;
	}

	validatePayload(): void {
		// TODO
	}
}

export type TransferRejectRequestedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
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
        // TODO: NOT IMPLEMENTED
    }
}

export type TransferQueryReceivedEvtPayload = {
	transferId: string;
    requesterFspId: string;
    destinationFspId: string;
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
        // TODO: NOT IMPLEMENTED
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
        // TODO: NOT IMPLEMENTED
    }
}

export type BulkTransferPrepareRequestedEvtPayload = {
    bulkTransferId: string;
    bulkQuoteId: string;
    payeeFsp: string;
    payerFsp: string;
    expiration: number;
    individualTransfers: {
        transferId: string;
        transferAmount: {
            currency: string;
            amount: string;
        };
        payerIdType: string;
        payeeIdType: string;
        transferType: string;
        extensions: {
            key: string;
            value: string;
        }[];
    }[];
    extensions: {
        key: string;
        value: string;
    }[];
}

export class BulkTransferPrepareRequestedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: BulkTransferPrepareRequestedEvtPayload;

    constructor (payload: BulkTransferPrepareRequestedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload (): void {
        // TODO
    }
}

export type BulkTransferFulfilRequestedEvtPayload = {
    bulkTransferId: string;
	completedTimestamp: number,
	bulkTransferState: "PENDING" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "REJECTED",
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

export class BulkTransferFulfilRequestedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: BulkTransferFulfilRequestedEvtPayload;

    constructor (payload: BulkTransferFulfilRequestedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload (): void {
        // TODO
    }
}

export type BulkTransferRejectRequestedEvtPayload = {
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

export class BulkTransferRejectRequestedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: BulkTransferRejectRequestedEvtPayload;

    constructor (payload: BulkTransferRejectRequestedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: NOT IMPLEMENTED
    }
}

export type BulkTransferQueryReceivedEvtPayload = {
    bulkTransferId: string;
    requesterFspId: string;
    destinationFspId: string;
}

export class BulkTransferQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;

    payload: BulkTransferQueryReceivedEvtPayload;

    constructor (payload: BulkTransferQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkTransferId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { bulkTransferId } = this.payload;

        if (!bulkTransferId) {
            throw new Error("bulkTransferId is required.");
		}
    }
}
