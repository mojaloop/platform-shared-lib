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

import {IGauge, IHistogram, ISummary, IMetrics} from "@mojaloop/platform-shared-lib-observability-types-lib";
import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import * as PromClient from "prom-client";

/**
 * Type that represents the options that are required for setup
 */
export type PrometheusMetricsOptions = {
    timeout?: number
    prefix?: string
    defaultLabels?: Map<string, string>
    register?: PromClient.Registry
}

export interface histogramsType { [key: string]: PromClient.Histogram<string> }
export interface summariesType { [key: string]: PromClient.Summary<string> }
export interface gaugesType { [key: string]: PromClient.Gauge<string> }

export class PrometheusMetrics implements IMetrics{
    private _logger:ILogger;
    private _options: PrometheusMetricsOptions = {};
    private _register: PromClient.Registry = PromClient.register;
    private _histograms: histogramsType = {};
    private _gauges: gaugesType = {};
    private _summaries: summariesType = {};

    private static _instance:PrometheusMetrics | null = null;
    private constructor(){}

    /**
     * Create the prom client for collecting metrics using the options passed
     * (singleton'ish pattern)
     */
    static Setup(options: PrometheusMetricsOptions, logger:ILogger):void {
        if (this._instance) {
            //silent ignore
            this._instance._logger.warn("Trying to create another instance of the PrometheusMetrics singleton - ignoring silently");
            return;
        }
        this._instance = new PrometheusMetrics();

        this._instance._options = options;

        if (this._instance._options.defaultLabels) {
            PromClient.register.setDefaultLabels(this._instance._options.defaultLabels);
        }

        const normalisedOptions:any = {
            prefix: this._instance._options.prefix,
            timeout: this._instance._options.timeout
        };

        // configure default metrics
        PromClient.collectDefaultMetrics(normalisedOptions);

        // set default registry
        this._instance._register = PromClient.register;
    }

    static getInstance():PrometheusMetrics{
        if(!this._instance){
            throw new Error("Called PrometheusMetrics.getInstance() before PrometheusMetrics.Create()");
        }

        return this._instance;
    }

    /********************************
    * Instance methods below
    *********************************/

    /**
     * Get the histogram values for given name or create new
     */
    getHistogram(name: string, help?: string, labelNames: string[] = [], buckets: number[] = [0.010, 0.050, 0.1, 0.5, 1, 2, 5]): IHistogram {
        try {
            if (this._histograms[name] != null) {
                return this._histograms[name];
            }
            this._histograms[name] = new PromClient.Histogram({
                name: `${this._options.prefix}${name}`,
                help: (help != null ? help : `${name}_histogram`),
                labelNames,
                buckets // this is in seconds - the startTimer().end() collects in seconds with ms precision
            });
            return this._histograms[name];
        } catch (e) {
            this._logger.error(e);
            throw new Error(`Couldn't get metrics histogram for ${name}`);
        }
    }

    /**
     * Get the gauge for given name or create new
     */
    getGauge(name: string, help?: string, labelNames: string[] = []):IGauge{
        try {
            if (this._gauges[name] != null) {
                return this._gauges[name];
            }
            this._gauges[name] = new PromClient.Gauge({
                name: `${this.getOptions().prefix}${name}`,
                help: (help != null ? help : `${name}_summary`),
                labelNames
            });
            return this._gauges[name];
        } catch (e){
            this._logger.error(e);
            throw new Error(`Couldn't get gauge for ${name}`);
        }
    }

    /**
     * Get the summary for given name or create new
     */
    getSummary(name: string, help?: string, labelNames: string[] = [], percentiles: number[] = [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999], maxAgeSeconds: number = 600, ageBuckets: number = 5): ISummary{ // <-- required for Prom-Client v11.x
        try {
            if (this._summaries[name] != null) {
                return this._summaries[name];
            }
            this._summaries[name] = new PromClient.Summary({
                name: `${this.getOptions().prefix}${name}`,
                help: (help != null ? help : `${name}_summary`),
                labelNames,
                maxAgeSeconds,
                percentiles,
                ageBuckets
            });
            return this._summaries[name];
        } catch (e) {
            this._logger.error(e);
            throw new Error(`Couldn't get summary for ${name}`);
        }
    }

    /**
     * Get string representation for all prometheus metrics - to be collected by prometheus scrappers
     */
    async getMetricsForPrometheusScrapper(): Promise<string>{
        return PromClient.register.metrics();
    }

    /**
     * Get string representation for all prometheus metrics in an array representation
     */
    async getMetricsAsArray(): Promise<PromClient.metric[]>{
        return PromClient.register.getMetricsAsArray();
    }

    /**
     * Get the options that are used to setup the prom-client
     */
    getOptions():PrometheusMetricsOptions{
        return this._options
    }

}
