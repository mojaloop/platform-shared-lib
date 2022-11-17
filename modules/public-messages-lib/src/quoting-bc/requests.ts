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
import { BOUNDED_CONTEXT_NAME_QUOTING, AGGREGATE_NAME_QUOTING, QuotingBCTopics } from ".";

export type QuoteRequestReceivedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
    quoteId: string;
    transactionId: string;
    transactionRequestId: string | null;
    payee: string;
    payer: string;
    amountType: string;
    amount: string;
    fees: string | null;
    transactionType: string;
    geoCode: string | null;
    note: string | null;
    expiration: string | null;
    extensionList: string | null;
}

export class QuotingRequestReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;
    payload: QuoteRequestReceivedEvtPayload;

    constructor (payload: QuoteRequestReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { requesterFspId, destinationFspId, quoteId, transactionId, payee, payer, amountType, amount, transactionType } = this.payload;

		if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}

        if (!destinationFspId) {
            throw new Error("destinationFspId is required.");
		}

        if (!quoteId) {
            throw new Error("quoteId is required.");
		}

        if (!transactionId) {
            throw new Error("transactionId is required.");
		}

        if (!payee) {
            throw new Error("payee is required.");
		}

        if (!payer) {
            throw new Error("payer is required.");
		}

        if (!amountType) {
            throw new Error("amountType is required.");
		}

        if (!amount) {
            throw new Error("amount is required.");
		}

        if (!transactionType) {
            throw new Error("transactionType is required.");
		}

    }	
}

export type QuoteResponseReceivedEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
    quoteId: string;
    transactionId: string;
    transactionRequestId: string | null;
    payee: string;
    payer: string;
    amountType: string;
    amount: string;
    fees: string | null;
    transactionType: string;
    geoCode: string | null;
    note: string | null;
    expiration: string | null;
    extensionList: string | null;
}

export class QuotingResponseReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainRequests;
    payload: QuoteResponseReceivedEvtPayload;

    constructor (payload: QuoteResponseReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { requesterFspId, destinationFspId, quoteId, transactionId, payee, payer, amountType, amount, transactionType } = this.payload;

		if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}

        if (!destinationFspId) {
            throw new Error("destinationFspId is required.");
		}

        if (!quoteId) {
            throw new Error("quoteId is required.");
		}

        if (!transactionId) {
            throw new Error("transactionId is required.");
		}

        if (!payee) {
            throw new Error("payee is required.");
		}

        if (!payer) {
            throw new Error("payer is required.");
		}

        if (!amountType) {
            throw new Error("amountType is required.");
		}

        if (!amount) {
            throw new Error("amount is required.");
		}

        if (!transactionType) {
            throw new Error("transactionType is required.");
		}

    }	
}