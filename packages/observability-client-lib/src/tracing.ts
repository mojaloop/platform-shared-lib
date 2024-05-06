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
 should be listed with a "*" in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a "-". Email address can be added
 optionally within square brackets <email>.

 * Interledger Foundation
 - Pedro Sousa Barreto <pedrosousabarreto@gmail.com>

 --------------
 ******/

"use strict";


import * as OpentelemetryApi from "@opentelemetry/api";
import {Context, Span, trace, Tracer} from "@opentelemetry/api";
import {NodeTracerProvider} from "@opentelemetry/node";
import {BatchSpanProcessor} from "@opentelemetry/tracing";
import {Resource, detectResourcesSync} from "@opentelemetry/resources";
// import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import {
    SEMRESATTRS_SERVICE_INSTANCE_ID,
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_NAMESPACE,
    SEMRESATTRS_SERVICE_VERSION
} from "@opentelemetry/semantic-conventions";
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-grpc";

import {ILogger} from "@mojaloop/logging-bc-public-types-lib";
import {ITracing} from "@mojaloop/platform-shared-lib-observability-types-lib";
import {OTLPGRPCExporterConfigNode} from "@opentelemetry/otlp-grpc-exporter-base";
import {AlwaysOnSampler, ParentBasedSampler, TraceIdRatioBasedSampler, Sampler} from "@opentelemetry/sdk-trace-base";
import * as process from "process";

//OpentelemetryApi.diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// registerInstrumentations({
//     instrumentations: [
//         new HttpInstrumentation(),
//         new FastifyInstrumentation({
//             // requestHook: function (span: Span, info: FastifyRequestInfo) {
//             //     span.setAttribute(
//             //         "PEDRO",
//             //         info.request.method,
//             //     )
//             // }
//         }),
//     ],
//     // traceExporter: new OTLPTraceExporter(),
//     // metricReader: new metrics.PeriodicExportingMetricReader({
//     //     exporter: new OTLPMetricExporter(),
//     // }),
// });


// export class OpenTelemetryClient extends Tracing implements ITracing {
export class OpenTelemetryClient implements ITracing {
    private _logger:ILogger;
    private _provider:NodeTracerProvider;

    private static _instance:OpenTelemetryClient;

    private constructor() {
        // intentionally empty
        //super();
    }

    static getInstance():ITracing{
        if (this._instance) return this._instance;

        throw new Error("Called OpenTelemetryClient.getInstance() before OpenTelemetryClient.Start()");
    }

    static Start(bcName:string, appName:string, appVersion:string, instanceId:string, logger:ILogger, collectorUrl?:string){
        if (this._instance) {
            throw new Error("Called OpenTelemetryClient.start() a second time - already started");
        }

        this._instance = new OpenTelemetryClient();
        this._instance._logger = logger;
        const detectedResource:Resource = detectResourcesSync();
        const resource = detectedResource.merge(new Resource({
            [SEMRESATTRS_SERVICE_NAMESPACE]: bcName,
            [SEMRESATTRS_SERVICE_NAME]: appName,
            [SEMRESATTRS_SERVICE_VERSION]: appVersion,
            [SEMRESATTRS_SERVICE_INSTANCE_ID]: instanceId,
        }));


        let sampler: Sampler;
        if(process.env["PRODUCTION_MODE"]){
            sampler = new ParentBasedSampler({
                root: new TraceIdRatioBasedSampler(0.05)
            });
        }else{
            sampler = new AlwaysOnSampler();
        }

        this._instance._provider = new NodeTracerProvider({
            resource: resource,
            sampler: sampler
        });
        this._instance._provider.register();

        // OTLPTraceExporter - will use OTEL_EXPORTER_OTLP_ENDPOINT if no url is set
        const collectorOptions: OTLPGRPCExporterConfigNode = {};
        if(collectorUrl) {
            collectorOptions.url = collectorUrl;
        }

        const otlpExporter = new OTLPTraceExporter(collectorOptions);
        this._instance._provider.addSpanProcessor(new BatchSpanProcessor(otlpExporter));


        // // provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
        // const zipkinExporter = new ZipkinExporter({
        //     url: "http://localhost:9411/api/v2/spans"
        // });
        // // this._instance._provider.addSpanProcessor(new SimpleSpanProcessor(zipkinExporter));
        // this._instance._provider.addSpanProcessor(new BatchSpanProcessor(zipkinExporter));

        this._instance._logger.info(`OpenTelemetryClient Started with - collector url: "${otlpExporter.getDefaultUrl(collectorOptions)}"`);
    }

    getTracer(tracerName: string): Tracer {
        OpenTelemetryClient._checkInitialised();

        return trace.getTracer(tracerName);
    }

    startSpanWithPropagationInput(tracer: Tracer, spanName: string, input: any): Span {
        OpenTelemetryClient._checkInitialised();

        const ctx = this.propagationExtract(input);
        return this.startSpan(tracer, spanName, ctx);
    }

    startChildSpan(tracer: Tracer, spanName: string, parentSpan: Span): Span {
        OpenTelemetryClient._checkInitialised();

        const ctx = OpentelemetryApi.trace.setSpan(OpentelemetryApi.context.active(), parentSpan);
        //const childSpan = OpenTelemetryClient.getInstance().startSpan(tracer, spanName, ctx);
        const childSpan = tracer.startSpan(spanName, undefined, ctx);
        return childSpan;
    }

    startSpan(tracer: Tracer, spanName: string, context?: Context): Span {
        OpenTelemetryClient._checkInitialised();

        const ctx = context || OpentelemetryApi.context.active();

        const span = tracer.startSpan(spanName, undefined, ctx);

        // Set the created span as active in the deserialized context.
        //trace.setSpan(ctx, span);
        return span;
    }

    propagationInject(currentSpan: Span, output: any) {
        OpenTelemetryClient._checkInitialised();

        const ctx = OpentelemetryApi.trace.setSpan(OpentelemetryApi.context.active(), currentSpan);
        OpentelemetryApi.propagation.inject(ctx, output);
    }

    propagationExtract(input: any): Context {
        OpenTelemetryClient._checkInitialised();

        const newContext = OpentelemetryApi.propagation.extract(OpentelemetryApi.context.active(), input);
        return newContext;
    }

    get context(): Context {
        OpenTelemetryClient._checkInitialised();

        return OpentelemetryApi.context.active();
    }

    private static _checkInitialised(){
        if (!this._instance) {
            throw new Error("Called OpenTelemetryClient.getInstance() before OpenTelemetryClient.Start()");
        }
    }
}
