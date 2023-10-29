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
import process from "process";
import {Server} from "net";
import express, {Express} from "express";

import {ILogger, LogLevel} from "@mojaloop/logging-bc-public-types-lib";
import {IMetrics} from "@mojaloop/platform-shared-lib-observability-types-lib";
import {IAuditClient} from "@mojaloop/auditing-bc-public-types-lib";
import {ITokenHelper} from "@mojaloop/security-bc-public-types-lib";
import {IConfigurationClient} from "@mojaloop/platform-configuration-bc-public-types-lib";

// DEFAULTS read in the constructor:
const DEFAULT_SVC_HTTP_PORT = 9999;
const DEFAULT_SVC_START_TIMEOUT_MS = 30_000;

/*
* Env vars read:
* - SVC_HTTP_PORT - for the http port if none provide by the constructor
* - SVC_START_TIMEOUT_MS - for the service timeout in ms if none provide by the constructor
* */

export abstract class ServiceBase{
    protected _configClient:IConfigurationClient;
    protected _logger: ILogger;
    protected _auditClient: IAuditClient;
    protected _metrics:IMetrics;
    protected _tokenHelper: ITokenHelper;
    protected _app: Express;
    protected _expressServer: Server;
    protected _serviceTimeoutMs: number;
    protected _startupTimer: NodeJS.Timeout;
    protected _httpPortNum: number;

    protected constructor(httpPortNum?:number, startTimeoutMs?:number){
        if (httpPortNum) {
            this._httpPortNum = httpPortNum
        } else {
            if (process.env["SVC_HTTP_PORT"] && !isNaN(parseInt(process.env["SVC_HTTP_PORT"]))) {
                this._httpPortNum = parseInt(process.env["SVC_HTTP_PORT"]);
            } else {
                this._httpPortNum = DEFAULT_SVC_HTTP_PORT;
            }
        }

        if (startTimeoutMs) {
            this._serviceTimeoutMs = startTimeoutMs
        } else {
            if (process.env["SVC_START_TIMEOUT_MS"] && !isNaN(parseInt(process.env["SVC_START_TIMEOUT_MS"]))) {
                this._serviceTimeoutMs = parseInt(process.env["SVC_START_TIMEOUT_MS"]);
            } else {
                this._serviceTimeoutMs = DEFAULT_SVC_START_TIMEOUT_MS;
            }
        }

    }

    async init(configClient:IConfigurationClient, logger: ILogger):Promise<void>{
        this._configClient = configClient;
        this._logger = logger;
    }

    abstract customStart(...args:any):Promise<void>;

    async start(){
        // note: this must use console.log
        console.log(`Service starting with PID: ${process.pid}`);

        this._startupTimer = setTimeout(()=>{
            throw new Error("Service start timed-out");
        }, this._serviceTimeoutMs);

        if(this.customStart) await this.customStart

        await this._setupExpress();

        console.log("Service start complete");
      }

      async stop():Promise<void>{

      }

    protected _setupExpress(): Promise<void> {
        return new Promise<void>(resolve => {
            this._app = express();
            this._app.use(express.json()); // for parsing application/json
            this._app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

            // Add health and metrics http routes - before others (to avoid authZ middleware)
            this._app.get("/health", (req: express.Request, res: express.Response) => {
                return res.send({ status: "OK" });
            });
            this._app.get("/metrics", async (req: express.Request, res: express.Response) => {
                const strMetrics = await (this.metrics as PrometheusMetrics).getMetricsForPrometheusScrapper();
                return res.send(strMetrics);
            });

            // Add admin and client http routes
            const transferAdminRoutes = new TransferAdminExpressRoutes(this.logger, this.transfersRepo, this.bulkTransfersRepo, this.tokenHelper, this.authorizationClient);

            this._app.use("/", transferAdminRoutes.mainRouter);

            this._app.use((req, res) => {
                // catch all
                res.send(404);
            });

            let portNum = this._httpPortNum;
            if (process.env["SVC_HTTP_PORT"] && !isNaN(parseInt(process.env["SVC_HTTP_PORT"]))) {
                portNum = parseInt(process.env["SVC_HTTP_PORT"]);
            }

            this._expressServer = this._app.listen(portNum, () => {
                this._logger.info(`🚀Server ready at port: ${this._httpPortNum}`);
                this._logger.info(`${this._configClient.applicationName} service v: ${this._configClient.applicationVersion} started.`);
                resolve();
            });
        });
    }

}
