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
import {
    SECURITY_AUTHENTICATION_AGGREGATE_NAME,
    SECURITY_AUTHORIZATION_AGGREGATE_NAME,
    SECURITY_BOUNDED_CONTEXT_NAME, SECURITY_BUILTIN_IAM_AGGREGATE_NAME,
    SecurityBCTopics
} from ".";

export type PlatformRoleChangedEvtPayload = {
  roleId: string;
}

export class PlatformRoleChangedEvt extends DomainEventMsg {
  boundedContextName: string = SECURITY_BOUNDED_CONTEXT_NAME;
  aggregateId: string;
  aggregateName: string = SECURITY_AUTHORIZATION_AGGREGATE_NAME;
  msgKey: string;
  msgTopic: string = SecurityBCTopics.DomainEvents;
  payload: PlatformRoleChangedEvtPayload;

  constructor(payload: PlatformRoleChangedEvtPayload) {
    super();

    this.aggregateId = this.msgKey = payload.roleId;
    this.payload = payload;
  }

  validatePayload(): void {
    // TODO
  }
}

export type AuthTokenInvalidatedEvtPayload = {
    tokenId:string;
    tokenExpirationDateTimestamp:number;
}

export class AuthTokenInvalidatedEvt extends DomainEventMsg {
    boundedContextName: string = SECURITY_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = SECURITY_AUTHENTICATION_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = SecurityBCTopics.DomainEvents;
    payload: AuthTokenInvalidatedEvtPayload;

    constructor(payload: AuthTokenInvalidatedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.tokenId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type UserRoleRemovedEvtPayload = {
    userId:string;
    roleIds:string[];
}

export class UserRoleRemovedEvt extends DomainEventMsg {
    boundedContextName: string = SECURITY_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = SECURITY_AUTHORIZATION_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = SecurityBCTopics.DomainEvents;
    payload: UserRoleRemovedEvtPayload;

    constructor(payload: UserRoleRemovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.userId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type AppRoleRemovedEvtPayload = {
    clientId:string;
    roleIds:string[];
}

export class AppRoleRemovedEvt extends DomainEventMsg {
    boundedContextName: string = SECURITY_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = SECURITY_AUTHORIZATION_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = SecurityBCTopics.DomainEvents;
    payload: AppRoleRemovedEvtPayload;

    constructor(payload: AppRoleRemovedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.clientId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type UserDisabledEvtPayload = {
    userId:string;
}
export class UserDisabledEvt extends DomainEventMsg {
    boundedContextName: string = SECURITY_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = SECURITY_BUILTIN_IAM_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = SecurityBCTopics.DomainEvents;
    payload: UserDisabledEvtPayload;

    constructor(payload: UserDisabledEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.userId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type AppDisabledEvtPayload = {
    clientId:string;
}
export class AppDisabledEvt extends DomainEventMsg {
    boundedContextName: string = SECURITY_BOUNDED_CONTEXT_NAME;
    aggregateId: string;
    aggregateName: string = SECURITY_BUILTIN_IAM_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = SecurityBCTopics.DomainEvents;
    payload: AppDisabledEvtPayload;

    constructor(payload: AppDisabledEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.clientId;
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}
