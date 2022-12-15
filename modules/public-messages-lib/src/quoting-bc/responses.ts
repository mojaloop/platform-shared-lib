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

 * Arg Software
 - Jose Francisco Antunes<jfantunes@arg.software>
 - Rui Rocha<rui.rocha@arg.software>

 --------------
 ******/

"use strict"

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import { BOUNDED_CONTEXT_NAME_QUOTING, AGGREGATE_NAME_QUOTING, QuotingBCTopics } from ".";

export type QuoteRequestAcceptedEvtPayload = {
    quoteId: string;
    transactionId: string;
    transactionRequestId: string | null;
    payee:  {
        partyIdInfo: {
            partyIdType: string;
            partyIdentifier: string;
            partySubIdOrType: string | null;
            fspId: string | null;
        };
        merchantClassificationCode: string | null,
        name: string | null,
        personalInfo: {
            complexName: {
                firstName: string | null;
                middleName: string | null;
                lastName: string | null;              
            } | null,
            dateOfBirth: string | null
        } | null
    };
    payer:{
        partyIdInfo: {
            partyIdType: string;
            partyIdentifier: string;
            partySubIdOrType: string | null;
            fspId: string | null;
        };
        merchantClassificationCode: string | null,
        name: string | null,
        personalInfo: {
            complexName: {
                firstName: string | null;
                middleName: string | null;
                lastName: string | null;              
            } | null,
            dateOfBirth: string | null
        } | null
    };
    amountType: "SEND" | "RECEIVE";
    amount: {
        currency: string;
        amount: string;
    };
    transactionType: {
        scenario: string
        subScenario: string | null
        initiator: string
        initiatorType: string
        refundInfo: {
            originalTransactionId: string
            refundReason: string | null
        } | null,
        balanceOfPayments: string | null
    };
    fees: {
        currency: string;
        amount: string;
    } | null;
    geoCode: {
        latitude: string;
        longitude: string;
    } | null;
    note: string | null;
    expiration: string | null;
    extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class QuoteRequestAcceptedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteRequestAcceptedEvtPayload;

    constructor (payload: QuoteRequestAcceptedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }


    validatePayload (): void {
        const { quoteId, transactionId, payee, payer, amountType, amount, transactionType } = this.payload;

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

export type QuoteResponseAcceptedEvtPayload = {
    quoteId: string;
    transferAmount: {
        currency: string;
        amount: string;
    };
    expiration: string;
    ilpPacket: string;
    condition: string;
    payeeReceiveAmount: {
        currency: string;
        amount: string;
    } | null;
    payeeFspFee: {
        currency: string;
        amount: string;
    } | null;
    payeeFspCommission: {
        currency: string;
        amount: string;
    } | null;
    geoCode: {
        latitude: string;
        longitude: string;
    } | null;
    extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class QuoteResponseAccepted extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteResponseAcceptedEvtPayload;

    constructor (payload: QuoteResponseAcceptedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload (): void {
        const { quoteId, transferAmount, expiration, ilpPacket, condition } = this.payload;

		if (!quoteId) {
            throw new Error("quoteId is required.");
		}

        if (!transferAmount) {
            throw new Error("transferAmount is required.");
		}

        if (!expiration) {
            throw new Error("expiration is required.");
		}

        if (!ilpPacket) {
            throw new Error("ilpPacket is required.");
		}

        if (!condition) {
            throw new Error("condition is required.");
		}
    }	
}

export type QuoteErrorEvtPayload = {
    requesterFspId: string;
    destinationFspId: string;
    quoteId: string;
    errorMsg: string;
    sourceEvent: string;
}

export class QuoteErrorEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteErrorEvtPayload;

    constructor (payload: QuoteErrorEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { requesterFspId, destinationFspId, quoteId, errorMsg } = this.payload;

        if (!requesterFspId) {
            throw new Error("requesterFspId is required.");
		}

        if (!destinationFspId) {
            throw new Error("destinationFspId is required.");
		}

        if (!quoteId) {
            throw new Error("quoteId is required.");
		}

		if (!errorMsg) {
            throw new Error("errorMsg is required.");
		}
    }
}

export type QuoteQueryResponseEvtPayload = {
    quoteId: string;
    transferAmount: {
        currency: string;
        amount: string;
    };
    expiration: string;
    ilpPacket: string;
    condition: string;
    payeeReceiveAmount: {
        currency: string;
        amount: string;
    } | null;
    payeeFspFee: {
        currency: string;
        amount: string;
    } | null;
    payeeFspCommission: {
        currency: string;
        amount: string;
    } | null;
    geoCode: {
        latitude: string;
        longitude: string;
    } | null;
    extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class QuoteQueryResponseEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;
    payload: QuoteQueryResponseEvtPayload;

    constructor (payload: QuoteQueryResponseEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.quoteId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { quoteId, transferAmount, expiration, ilpPacket, condition } = this.payload;

		if (!quoteId) {
            throw new Error("quoteId is required.");
		}

        if (!transferAmount) {
            throw new Error("transferAmount is required.");
		}

        if (!expiration) {
            throw new Error("expiration is required.");
		}

        if (!ilpPacket) {
            throw new Error("ilpPacket is required.");
		}

        if (!condition) {
            throw new Error("condition is required.");
		}
    }
}

export type BulkQuoteReceivedEvtPayload = {
    bulkQuoteId: string;
    payer:  {
        partyIdInfo: {
            partyIdType: string;
            partyIdentifier: string;
            partySubIdOrType: string | null;
            fspId: string | null;
        };
        merchantClassificationCode: string | null,
        name: string | null,
        personalInfo: {
            complexName: {
                firstName: string | null;
                middleName: string | null;
                lastName: string | null;              
            } | null,
            dateOfBirth: string | null
        } | null
    };
    geoCode: {
        latitude: string;
        longitude: string;
    } | null;
    expiration: string | null;
    individualQuotes: {
        quoteId: string;
        transactionId: string;
        payee:  {
            partyIdInfo: {
                partyIdType: string;
                partyIdentifier: string;
                partySubIdOrType: string | null;
                fspId: string | null;
            };
            merchantClassificationCode: string | null,
            name: string | null,
            personalInfo: {
                complexName: {
                    firstName: string | null;
                    middleName: string | null;
                    lastName: string | null;              
                } | null,
                dateOfBirth: string | null
            } | null
        };
        amountType: "SEND" | "RECEIVE";
        amount: {
            currency: string;
            amount: string;
        };
        fees: {
            currency: string;
            amount: string;
        } | null;
        transactionType: {
            scenario: string
            subScenario: string | null
            initiator: string
            initiatorType: string
            refundInfo: {
                originalTransactionId: string
                refundReason: string | null
            } | null,
            balanceOfPayments: string | null
        };
        note: string | null;
        extensionList: {
            extension: {
                key: string;
                value: string;
            }[]
        } | null;
    }[];
    extensionList: {
        extension: {
            key: string;
            value: string;
        }[]
    } | null;
}

export class BulkQuoteReceivedEvt extends DomainEventMsg {
    boundedContextName: string = BOUNDED_CONTEXT_NAME_QUOTING
    aggregateId: string;
    aggregateName: string = AGGREGATE_NAME_QUOTING;
    msgKey: string;
    msgTopic: string = QuotingBCTopics.DomainEvents;

    payload: BulkQuoteReceivedEvtPayload;

    constructor (payload: BulkQuoteReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.bulkQuoteId;
        this.payload = payload;
    }

    validatePayload (): void { 
        const { bulkQuoteId, payer, individualQuotes } = this.payload;

        if (!bulkQuoteId) {
            throw new Error("bulkQuoteId is required.");
		}

        if (!payer) {
            throw new Error("payer is required.");
		}

        if (!individualQuotes) {
            throw new Error("individualQuotes is required.");
		}

        if (individualQuotes.length < 0) {
            throw new Error("individualQuotes needs at least one element.");
		}
    }
}