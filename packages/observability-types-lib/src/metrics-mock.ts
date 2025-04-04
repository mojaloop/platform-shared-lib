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
/* eslint-disable */
"use strict";

import {ICounter, IGauge, IHistogram, IMetrics, ISummary, LabelValues} from "./metrics";

export class HistogramMock implements IHistogram{
    observe(arg1: number| LabelValues<string>, value?: number): void{}
    startTimer(labels?: LabelValues<string>): (labels?: LabelValues<string>) => number{
        return (labels?: LabelValues<string>)  => {return 0};
    }
}

export class SummaryMock implements ISummary{
    observe(arg1: number| LabelValues<string>, value?: number): void{}
    startTimer(labels?: LabelValues<string>): (labels?: LabelValues<string>) => number{
        return (labels?: LabelValues<string>)  => {return 0};
    }
}

export class GaugeMock implements IGauge{
    set(arg1: number |LabelValues<string>, value?:number):void{}
    inc(arg1?: number |LabelValues<string>, amount?:number):void{}
    dec(arg1?: number |LabelValues<string>, value?:number):void{}
}

export class CounterMock implements ICounter{
    inc(labels?: number|LabelValues<string>, value?: number, amount?:number):void{}
}

export class MetricsMock implements IMetrics{
    getHistogram(name: string, help?: string, labelNames?: string[], buckets?: number[]): IHistogram {
        return new HistogramMock();
    }

    getCounter(name: string, help?: string, labelNames?: string[]): ICounter {
        return new CounterMock();
    }

    getGauge(name: string, help?: string, labelNames?: string[]): IGauge {
        return new GaugeMock();
    }

    getSummary(name: string, help?: string, labelNames?: string[], percentiles?: number[], maxAgeSeconds?: number, ageBuckets?: number): ISummary {
        return new SummaryMock();
    }

}
