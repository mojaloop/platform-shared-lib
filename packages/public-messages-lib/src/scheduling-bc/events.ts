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

import {DomainEventMsg} from "@mojaloop/platform-shared-lib-messaging-types-lib";
import {SCHEDULING_AGGREGATE_NAME, SCHEDULING_BOUNDED_CONTEXT_NAME} from "./index";

export type CreatedReminderEvtPayload = {
    id: string;
    time: string; // TODO: Date.
    payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    taskType: string;
    httpPostTaskDetails: null | {
        url: string
    };
    eventTaskDetails: null | {
        topic: string
    };
}

export class CreatedReminderEvt extends DomainEventMsg {
    aggregateName: string = SCHEDULING_AGGREGATE_NAME
    aggregateId: string;
    boundedContextName: string = SCHEDULING_BOUNDED_CONTEXT_NAME;
    msgKey: string;
    msgTopic: string;
    payload: CreatedReminderEvtPayload;

    constructor(payload: CreatedReminderEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.id;
        this.payload = payload;
    }

    validatePayload(): void {
        // No validation
    }
}

export type CreatedSingleReminderEvtPayload = {
    id: string;
    time: string | number; // TODO: Date.
    payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    taskType: string;
    httpPostTaskDetails: null | {
        url: string
    };
    eventTaskDetails: null | {
        topic: string
    };
}

export class CreatedSingleReminderEvt extends DomainEventMsg {
    aggregateName: string = SCHEDULING_AGGREGATE_NAME;
    aggregateId: string;
    boundedContextName: string = SCHEDULING_BOUNDED_CONTEXT_NAME;
    msgKey: string;
    msgTopic: string;
    payload: CreatedSingleReminderEvtPayload;

    constructor(payload: CreatedSingleReminderEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.id;
        this.payload = payload;
    }
    validatePayload(): void {
        // No validation
    }

}

export type DeletedReminderEvtPayload = {
    id: string;
}

export class DeletedReminderEvt extends DomainEventMsg {
    aggregateName: string = SCHEDULING_AGGREGATE_NAME;
    aggregateId: string;
    boundedContextName: string = SCHEDULING_BOUNDED_CONTEXT_NAME;
    msgKey: string;
    msgTopic: string;
    payload: DeletedReminderEvtPayload;

    constructor(payload: DeletedReminderEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.id;
        this.payload = payload;
    }
    validatePayload(): void {
        // is there need to validate a string. Type enforced by DeleteReminderEvtPayload
    }

}

export type DeletedRemindersEvtPayload = {
    id:string;
}


export class DeletedRemindersEvt extends DomainEventMsg {
    aggregateName: string = SCHEDULING_AGGREGATE_NAME;
    aggregateId: string;
    boundedContextName: string = SCHEDULING_BOUNDED_CONTEXT_NAME;
    msgKey: string;
    msgTopic: string;
    payload: DeletedRemindersEvtPayload;

    constructor(payload: DeletedRemindersEvtPayload) {
        super();
        this.aggregateId = this.msgKey = payload.id;
        this.payload = payload;
    }

    validatePayload(): void {
        // Validation not needed?
    }

}
