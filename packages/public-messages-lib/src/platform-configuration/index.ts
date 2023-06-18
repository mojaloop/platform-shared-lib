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

const PLATFORMCONFIGURATION_BOUNDED_CONTEXT_NAME = "PlatformConfigurationBc";
const PLATFORMCONFIGURATION_AGGREGATE_NAME = "PlatformConfiguration";

enum PlatformConfigurationBCTopics {
    "DomainEvents" = "PlatformConfigurationBcEvents"
}

export {PlatformConfigurationBCTopics , PLATFORMCONFIGURATION_BOUNDED_CONTEXT_NAME, PLATFORMCONFIGURATION_AGGREGATE_NAME};

/*
Note: move events to its own file when there are more
*/

export type PlatformConfigGlobalConfigsChangedEvtPayload = {
    environmentName: string;                        // target environment name
    schemaVersion: string;                          // config schema version (semver format)
    iterationNumber: number;                        // monotonic integer - increases on every configuration/values change
}


export class PlatformConfigGlobalConfigsChangedEvt extends DomainEventMsg {
    boundedContextName: string = PLATFORMCONFIGURATION_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = PLATFORMCONFIGURATION_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = PlatformConfigurationBCTopics.DomainEvents;
    payload: PlatformConfigGlobalConfigsChangedEvtPayload;

    constructor(payload: PlatformConfigGlobalConfigsChangedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.iterationNumber.toString();
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}

export type PlatformConfigAppConfigsChangedEvtPayload = {
    environmentName: string;                        // target environment name
    schemaVersion: string;                          // config schema version (semver format)
    iterationNumber: number;                        // monotonic integer - increases on every configuration/values change

    boundedContextName: string;                     // target bounded context
    applicationName: string;                        // target application name
    applicationVersion: string;                     // target app version (semver format)
}


export class PlatformConfigAppConfigsChangedEvt extends DomainEventMsg {
    boundedContextName: string = PLATFORMCONFIGURATION_BOUNDED_CONTEXT_NAME
    aggregateId: string;
    aggregateName: string = PLATFORMCONFIGURATION_AGGREGATE_NAME;
    msgKey: string;
    msgTopic: string = PlatformConfigurationBCTopics.DomainEvents;
    payload: PlatformConfigAppConfigsChangedEvtPayload;

    constructor(payload: PlatformConfigAppConfigsChangedEvtPayload) {
        super();

        this.aggregateId = this.msgKey = payload.iterationNumber.toString();
        this.payload = payload;
    }

    validatePayload(): void {
        // TODO
    }
}
