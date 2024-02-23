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
import { FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME, FOREIGN_EXCHANGE_AGGREGATE_NAME, ForeignExchangeBCTopics } from "..";

export type FxQuoteRequestAcceptedEvtPayload = {
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

export class FxQuoteRequestAcceptedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCTopics.DomainEvents;
    payload: FxQuoteRequestAcceptedEvtPayload;

    constructor(payload: FxQuoteRequestAcceptedEvtPayload) {
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

export type FxQuoteResponseAcceptedEvtPayload = {
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

export class FxQuoteResponseAcceptedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCTopics.DomainEvents;
    payload: FxQuoteResponseAcceptedEvtPayload;

    constructor(payload: FxQuoteResponseAcceptedEvtPayload) {
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

export type FxQuoteQueryRespondedEvtPayload = {
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

export class FxQuoteQueryRespondedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCTopics.DomainEvents;
    payload: FxQuoteQueryRespondedEvtPayload;

    constructor(payload: FxQuoteQueryRespondedEvtPayload) {
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

export type FxQuoteRejectRespondedEvtPayload = {
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

export class FxQuoteRejectRespondedEvt extends DomainEventMsg {
    boundedContextName: string = FOREIGN_EXCHANGE_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = FOREIGN_EXCHANGE_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = ForeignExchangeBCTopics.DomainEvents;
    payload: FxQuoteRejectRespondedEvtPayload;

    constructor(payload: FxQuoteRejectRespondedEvtPayload) {
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