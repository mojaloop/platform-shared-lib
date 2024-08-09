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

import { DomainEventMsg, MessageTypes } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { TRANSFERS_BOUNDED_CONTEXT_NAME, TRANSFERS_AGGREGATE_NAME, TransfersBCTopics } from ".";
import { Extension, TransferFulfilRequestedEvtPayloadPB, TransferFulfilRequestedEvtPB, TransferPrepareRequestedEvtPayloadPB, TransferPrepareRequestedEvtPB, TransferState } from "../proto/transfer";
import { Any } from 'google-protobuf/google/protobuf/any_pb';


export interface TransferPrepareRequestedEvtPayload {
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
    extensions: { key: string; value: string }[];
}

export class TransferPrepareRequestedEvt extends DomainEventMsg {

    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;
    msgName: string = TransferPrepareRequestedEvt.name;
    payload: TransferPrepareRequestedEvtPayload;

    constructor(payload: TransferPrepareRequestedEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
		// TODO
	}

    serialize(): Uint8Array {
        const payload = new TransferPrepareRequestedEvtPayloadPB();
        payload.requesterFspId = this.payload.requesterFspId;
        payload.destinationFspId = this.payload.destinationFspId;
        payload.transferId = this.payload.transferId;
        payload.payeeFsp = this.payload.payeeFsp;
        payload.payerFsp = this.payload.payerFsp;
        payload.amount = this.payload.amount;
        payload.currencyCode = this.payload.currencyCode;
        payload.expiration = this.payload.expiration;
        payload.payerIdType = this.payload.payerIdType;
        payload.payeeIdType = this.payload.payeeIdType;
        payload.transferType = this.payload.transferType;

        this.payload.extensions.forEach(ext => {
            const extension = new Extension();
            extension.key = ext.key;
            extension.value = ext.value;
            payload.extensions.push(extension);
        });

        const event = new TransferPrepareRequestedEvtPB();
        event.boundedContextName = this.boundedContextName;
        event.aggregateId = this.aggregateId;
        event.aggregateName = this.aggregateName;
        event.msgKey = this.msgKey;
        event.msgTopic = this.msgTopic;
        event.msgName = this.msgName;
        event.msgType = this.msgType;
        debugger

        if (this.fspiopOpaqueState) {
            const opaqueStateAny = new Any();
            opaqueStateAny.pack(this.fspiopOpaqueState, "type.googleapis.com/google.protobuf.Struct");
            event.fspiopOpaqueState = opaqueStateAny as any;
        }

        if (this.tracingInfo) {
            const opaqueStateAny = new Any();
            opaqueStateAny.pack(this.tracingInfo, "type.googleapis.com/google.protobuf.Struct");
            event.tracingInfo = opaqueStateAny as any;
        }
        
        event.payload = payload;

        return event.serializeBinary();
    }
    
}

export type TransferFulfilRequestedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
    transferId: string;
    transferState: TransferState;
    completedTimestamp: number;
    notifyPayee: boolean;
};

export class TransferFulfilRequestedEvt extends DomainEventMsg {
    boundedContextName: string = TRANSFERS_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = TRANSFERS_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = TransfersBCTopics.DomainRequests;
    msgName: string = TransferFulfilRequestedEvt.name;
    payload: TransferFulfilRequestedEvtPayload;

    constructor(payload: TransferFulfilRequestedEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.transferId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO: Add validation logic as needed
    }

    serialize(): Uint8Array {
        const payload = new TransferFulfilRequestedEvtPayloadPB();
        payload.requesterFspId = this.payload.requesterFspId;
        payload.destinationFspId = this.payload.destinationFspId;
        payload.transferId = this.payload.transferId;
        payload.transferState = this.payload.transferState;
        payload.completedTimestamp = this.payload.completedTimestamp;
        payload.notifyPayee = this.payload.notifyPayee;

        const event = new TransferFulfilRequestedEvtPB();
        event.boundedContextName = this.boundedContextName;
        event.aggregateId = this.aggregateId;
        event.aggregateName = this.aggregateName;
        event.msgKey = this.msgKey;
        event.msgTopic = this.msgTopic;
        event.msgName = this.msgName;
        event.msgType = this.msgType;
        event.fspiopOpaqueState = this.fspiopOpaqueState;
        // event.tracingInfo = this.tracingInfo;
        event.payload = payload;

        return event.serializeBinary();
    }
}

export type TransferRejectRequestedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
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
        // TODO: NOT IMPLEMENTED
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
        errorInformation: {
            errorCode: string;
            errorDescription: string;
        }
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
