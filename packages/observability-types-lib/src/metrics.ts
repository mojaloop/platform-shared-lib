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

//import {Histogram} from "prom-client";

export type LabelValues<T extends string> = Partial<Record<T, string | number>>;

export interface IHistogram{
    observe(value: number): void;
    observe(labels: LabelValues<string>, value: number): void;
    startTimer(labels?: LabelValues<string>): (labels?: LabelValues<string>) => number;
}

export interface ISummary{
    observe(value: number): void;
    observe(labels: LabelValues<string>, value: number): void;
    startTimer(labels?: LabelValues<string>): (labels?: LabelValues<string>) => number;
}

export interface IGauge{
    set(value:number):void;
    inc(amount?:number):void;
    dec(value?:number):void;
}

export interface ICounter{
    inc(amount?:number):void;
    inc(labels: LabelValues<string>, value: number, amount?:number):void;
}

export interface IMetrics {
    getHistogram(name: string, help?: string, labelNames?: string[], buckets?: number[]): IHistogram;
    getSummary(name: string, help?: string, labelNames?: string[], percentiles?: number[], maxAgeSeconds?: number, ageBuckets?: number): ISummary;
    getGauge(name: string, help?: string, labelNames?: string[]): IGauge;
    getCounter(name: string, help?: string, labelNames?: string[]): ICounter;
    // getMetricsForPrometheus(): Promise<string>;
    // getDefaultRegister(): client.Registry;
}
