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

 * ThitsaWorks
 - Si Thu Myo <sithu.myo@thitsaworks.com>

 --------------
 ******/

"use strict";

import { DomainEventMsg } from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {
    CertManagementBCTopics,
    CERT_MANAGEMENT_BOUNDED_CONTEXT_NAME,
    CERT_MANAGEMENT_AGGREGATE_NAME,
} from "./index";

export type CertQueryReceivedEvtPayload = {
    requesterFspId: string;
    participantId: string; // certId
};

export class CertQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = CERT_MANAGEMENT_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = CERT_MANAGEMENT_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = CertManagementBCTopics.DomainEvents;
    payload: CertQueryReceivedEvtPayload;

    constructor(payload: CertQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.participantId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type CertListQueryReceivedEvtPayload = {
    participantId: string;
};

export class CertListQueryReceivedEvt extends DomainEventMsg {
    boundedContextName: string = CERT_MANAGEMENT_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = CERT_MANAGEMENT_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = CertManagementBCTopics.DomainEvents;
    payload: CertListQueryReceivedEvtPayload;

    constructor(payload: CertListQueryReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.participantId;
        this.payload = payload;
    }

    validatePayload(): void {
        // NOT IMPLEMENTED
    }
}

export type CertCreateReceiveEvtPayload = {
    participantId: string;
    cert: string;
};

export class CertCreateReceiveEvt extends DomainEventMsg {
    boundedContextName: string = CERT_MANAGEMENT_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = CERT_MANAGEMENT_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = CertManagementBCTopics.DomainEvents;
    payload: CertCreateReceiveEvtPayload;

    constructor(payload: CertCreateReceiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.participantId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type CertChangeReceiveEvtPayload = {
    participantId: string;
};

export class CertChangeReceiveEvt extends DomainEventMsg {
    boundedContextName: string = CERT_MANAGEMENT_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = CERT_MANAGEMENT_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = CertManagementBCTopics.DomainEvents;
    payload: CertChangeReceiveEvtPayload;

    constructor(payload: CertChangeReceiveEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.participantId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type CertDeleteReceivedEvtPayload = {
    participantId: string;
};

export class CertDeleteReceivedEvt extends DomainEventMsg {
    boundedContextName: string = CERT_MANAGEMENT_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = CERT_MANAGEMENT_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = CertManagementBCTopics.DomainEvents;
    payload: CertDeleteReceivedEvtPayload;

    constructor(payload: CertDeleteReceivedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.participantId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

