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

 * Arg Software
 - Jose Francisco Antunes<jfantunes@arg.software>
 - Rui Rocha<rui.rocha@arg.software>

 --------------
 ******/

"use strict";

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME, FOREIGN_EXCHANGE_AGGREGATE_NAME, ForeignExchangeBCQuoteTopics } from "..";

export type FxQuoteRequestReceivedEvtPayload = {
    conversionRequestId: string;
    conversionTerms: {
        conversionId: string;
        determiningTransferId: string | null;
        initiatingFsp: string;
        counterPartyFsp: string;
        amountType: "SEND" | "RECEIVE";
        sourceAmount: {
            currency: string;
            amount: string | null;
        };
        targetAmount: {
            currency: string;
            amount: string | null;
        };
        expiration: string;
        charges: {
            chargeType: string;
            sourceAmount: {
                currency: string;
                amount: string;
            } | null;
            targetAmount: {
                currency: string;
                amount: string;
            } | null;
        }[] | null;
        extensionList: {
            extension: {
                key: string;
                value: string;
            }[]
        } | null;
    }
};

export class FxQuoteRequestReceivedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainRequests;
    payload: FxQuoteRequestReceivedEvtPayload;

    constructor(payload: FxQuoteRequestReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { conversionRequestId, conversionTerms } = this.payload;

		if (!conversionRequestId) {
            throw new Error("conversionRequestId is required.");
		}

        if (!conversionTerms) {
            throw new Error("conversionTerms is required.");
		}
    }
}

export type FxQuoteResponseReceivedEvtPayload = {
    conversionRequestId: string;
    condition: string | null;
    conversionTerms: {
        conversionId: string;
        determiningTransferId: string | null;
        initiatingFsp: string;
        counterPartyFsp: string;
        amountType: "SEND" | "RECEIVE";
        sourceAmount: {
            currency: string;
            amount: string | null;
        };
        targetAmount: {
            currency: string;
            amount: string | null;
        };
        expiration: string;
        charges: {
            chargeType: string;
            sourceAmount: {
                currency: string;
                amount: string;
            } | null;
            targetAmount: {
                currency: string;
                amount: string;
            } | null;
        }[] | null;
        extensionList: {
            extension: {
                key: string;
                value: string;
            }[]
        } | null;
    }
};

export class FxQuoteResponseReceivedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainRequests;
    payload: FxQuoteResponseReceivedEvtPayload;

    constructor(payload: FxQuoteResponseReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { conversionRequestId, conversionTerms } = this.payload;

		if (!conversionRequestId) {
            throw new Error("conversionRequestId is required.");
		}

        if (!conversionTerms) {
            throw new Error("conversionTerms is required.");
		}
    }
}

export type FxQuoteQueryReceivedEvtPayload = {
    conversionRequestId: string;
}

export class FxQuoteQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainRequests;
    payload: FxQuoteQueryReceivedEvtPayload;

    constructor(payload: FxQuoteQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { conversionRequestId } = this.payload;

		if (!conversionRequestId) {
            throw new Error("conversionRequestId is required.");
		}
    }
}

export type FxQuoteRejectReceivedEvtPayload = {
    conversionRequestId: string;
    errorInformation: {
		errorCode: string;
		errorDescription: string;
        extensionList: {
            extension: {
                key: string;
                value: string;
            }[]
        } | null;
	}
};

export class FxQuoteRejectReceivedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCQuoteTopics.DomainRequests;
    payload: FxQuoteRejectReceivedEvtPayload;

    constructor(payload: FxQuoteRejectReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.conversionRequestId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { conversionRequestId } = this.payload;

		if (!conversionRequestId) {
            throw new Error("conversionRequestId is required.");
		}
    }
}