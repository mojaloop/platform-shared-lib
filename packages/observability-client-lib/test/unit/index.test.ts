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
"use strict";
import {ConsoleLogger, ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {IHistogram, IMetrics} from "@mojaloop/platform-shared-lib-observability-types-lib";

let logger:ILogger = new ConsoleLogger();
import {PrometheusMetrics, PrometheusMetricsOptions} from "../../src";

let options: PrometheusMetricsOptions;
let metricsInterface: IMetrics;
let promMetrics: PrometheusMetrics;

describe("observability-client-lib tests", () => {

  beforeAll(async () => {
    // Setup
    options = {
      prefix: "prefix"
    };

    PrometheusMetrics.Setup(options,logger);
    metricsInterface = promMetrics = PrometheusMetrics.getInstance();
  })

  afterAll(async () => {
    // Cleanup
  })

  test("test gauges", async () => {
    const gauge1 = metricsInterface.getGauge("gauge_1", "gauge_1 help text");
    gauge1.set(10);
    gauge1.inc(2);
    gauge1.inc();
    gauge1.dec();
    gauge1.dec(5);

    const resp = await  promMetrics.getMetricsForPrometheusScrapper();
    expect(resp.includes("prefixgauge_1 7")).toBeTruthy();
  });

  test("test histograms", async () => {
    const hist1 = metricsInterface.getHistogram("histo_1", "histo_1 help text");
    hist1.observe(2);
    hist1.observe(3);

    const resp = await  promMetrics.getMetricsForPrometheusScrapper();
    expect(resp.includes("prefixhisto_1_sum 5")).toBeTruthy();
    expect(resp.includes("prefixhisto_1_count 2")).toBeTruthy();
  });

  test("histograms summary timers", async () => {
    const histo2 = metricsInterface.getSummary("histo_2", "histo_2 help text");
    const endTimer = histo2.startTimer();

    await new Promise(f => setTimeout(f, 601));
    endTimer();

    const exactTime = Number((histo2 as any).hashMap[""].sum);
    expect(exactTime).toBeGreaterThanOrEqual(0.599);
    expect(exactTime).toBeLessThan(0.699);

    const resp = await  promMetrics.getMetricsForPrometheusScrapper();
    expect(resp.includes("prefixhisto_2_count 1")).toBeTruthy();
    const re = new RegExp(`prefixhisto_2_sum ${exactTime}`);
    expect(re.test(resp)).toBeTruthy();
  });

  test("test summaries", async () => {
    const summary1 = metricsInterface.getSummary("summary_1", "summary_1 help text");
    summary1.observe(2);
    summary1.observe(3);

    const resp = await  promMetrics.getMetricsForPrometheusScrapper();
    expect(resp.includes("prefixsummary_1_sum 5")).toBeTruthy();
    expect(resp.includes("prefixsummary_1_count 2")).toBeTruthy();
  });


  test("test summary timers", async () => {
    const summary2 = metricsInterface.getSummary("summary_2", "summary_1 help text");
    const endTimer = summary2.startTimer();

    await new Promise(f => setTimeout(f, 805));
    endTimer();

    const exactTime = Number((summary2 as any).hashMap[""].sum);
    expect(exactTime).toBeGreaterThanOrEqual(0.799);
    expect(exactTime).toBeLessThan(0.899);

    const resp = await  promMetrics.getMetricsForPrometheusScrapper();
    expect(resp.includes("prefixsummary_2_count 1")).toBeTruthy();
    const re = new RegExp(`prefixsummary_2_sum ${exactTime}`);
    expect(re.test(resp)).toBeTruthy();
  });

})
