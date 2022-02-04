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

'use strict'

import { EventEmitter } from 'events'
import * as RDKafka from 'node-rdkafka'
import { ILogger } from '@mojaloop/logging-bc-logging-client-lib'
import { IMessage, IMessageProducer } from '@mojaloop/platform-shared-lib-messaging-types-lib'
import { MessageHeader, NumberNullUndefined } from 'node-rdkafka/index'

export class MLKafkaProducerOptions {
    kafkaBrokerList: string
    producerClientId?: string
    skipAcknowledgements?: boolean
}

interface MLKafkaProducerEventListenerMap {
  'deliveryReport': (topic: string, partition: number | null, offset: number | null) => void,
  'testEvent': (testEventArg: number) => void
}

export class MLKafkaProducer extends EventEmitter implements IMessageProducer {
    private readonly _logger: ILogger | null
    private readonly _client!: RDKafka.HighLevelProducer;
    private _globalConfig: RDKafka.ProducerGlobalConfig
    private _topicConfig: RDKafka.ProducerTopicConfig
    private readonly _options: MLKafkaProducerOptions

    // synthetic sugar for type events
    public on<K extends keyof MLKafkaProducerEventListenerMap>(e: K, listener: MLKafkaProducerEventListenerMap[K]): this { return super.on(e, listener) }
    public once<K extends keyof MLKafkaProducerEventListenerMap>(e: K, listener: MLKafkaProducerEventListenerMap[K]): this { return super.once(e, listener) }
    public emit<K extends keyof MLKafkaProducerEventListenerMap>(event: K, ...args: Parameters<MLKafkaProducerEventListenerMap[K]>): boolean { return super.emit(event, ...args) }

    constructor (options: MLKafkaProducerOptions, logger: ILogger | null = null) {
      super()
      this._options = options
      this._logger = logger

      // parse options and apply defaults
      this._parseOptionsAndApplyDefault()

      // this._topicConfig.partitioner_cb = () => {
      //   console.log(arguments)
      // }

      this._client = new RDKafka.HighLevelProducer(this._globalConfig, this._topicConfig)

      this._client.on('ready', this._onReady.bind(this))
      this._client.on('event.error', this._onError.bind(this))
      this._client.on('event.throttle', this._onThrottle.bind(this))
      this._client.on('event.log', this._onLog.bind(this))
      this._client.on('event.stats', this._onStats.bind(this))
      this._client.on('disconnected', this._onDisconnect.bind(this))
      this._client.on('delivery-report', this._onDeliveryReport.bind(this))

      this._logger?.isInfoEnabled() && this._logger.info('MLKafkaProducer - instance created')
      this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaProducer - features: ${RDKafka.features}`)
    }

    private _parseOptionsAndApplyDefault () {
      // global client options
      this._globalConfig = {
        'metadata.broker.list': this._options.kafkaBrokerList
      }
      this._topicConfig = {}

      if (this._options.producerClientId) {
        this._globalConfig['client.id'] = this._options.producerClientId
      }

      if (this._options.skipAcknowledgements === true) {
        this._topicConfig['request.required.acks'] = 0
      }

      this._globalConfig.dr_cb = true
    }

    private _onReady (info: RDKafka.ReadyInfo, metadata: RDKafka.Metadata): void {
      this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaProducer - event.ready - info: ${JSON.stringify(info, null, 2)}`)
      this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaProducer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`)
    }

    private _onError (error: RDKafka.LibrdKafkaError): void {
      this._logger?.isErrorEnabled() && this._logger.error(`MLKafkaProducer - event.error - ${JSON.stringify(error, null, 2)}`)
    }

    private _onThrottle (eventData: any) {
      this._logger?.isWarnEnabled() && this._logger.warn(`MLKafkaProducer - event.throttle - ${JSON.stringify(eventData, null, 2)}`)
    }

    private _onLog (eventData: any): void {
      this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaProducer - event.log - ${JSON.stringify(eventData, null, 2)}`)
    }

    private _onStats (eventData: any): void {
      this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaProducer - event.stats - ${eventData.message}`)
    }

    private _onDisconnect (metrics: RDKafka.ClientMetrics): void {
      if (metrics?.connectionOpened) {
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaProducer - event.disconnected - connected for ${(Date.now() - metrics.connectionOpened) / 1000} secs`)
      } else {
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaProducer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`)
      }
    }

    private _onDeliveryReport (err: RDKafka.LibrdKafkaError, eventData: RDKafka.DeliveryReport): void {
      if (err) {
        this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaProducer - delivery-report error')
      } else {
        this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaProducer - delivery-report - ${JSON.stringify(eventData, null, 2)}`)
      }
    }

    private _toRDKafkaProduceParams (msg: IMessage): { topic: string, partition: NumberNullUndefined, message: Buffer, key: Buffer, timestamp: NumberNullUndefined, headers: MessageHeader[] } {
      const topic: string = msg.topic
      const partition = -1 // use default from rdkafka
      const timestamp = msg.timestamp

      let message: Buffer = new Buffer(0) // default
      if (typeof (msg.value) === 'string') {
        message = Buffer.from(msg.value, 'utf-8')
      } else if (typeof (msg.value) === 'object') {
        try {
          message = Buffer.from(JSON.stringify(msg.value), 'utf-8')
        } catch (err) {
          this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaProducer - error parsing message value - JSON.stringify() error')
        }
      }

      let key: Buffer = new Buffer(0) // default
      if (typeof (msg.key) === 'string') {
        key = Buffer.from(msg.key, 'utf-8')
      } else if (typeof (msg.key) === 'object') {
        try {
          key = Buffer.from(JSON.stringify(msg.key), 'utf-8')
        } catch (err) {
          this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaProducer - error parsing key value - JSON.stringify() error')
        }
      }

      const headers: MessageHeader[] = []
      msg.headers?.forEach((header) => {
        // NOTE: kafka headers are key/value pairs, only one pair will ever exist per header rec
        for (const key in header) {
          if (!header.hasOwnProperty(key)) continue
          headers.push({ [key]: header[key] })
        }
      })

      return {
        topic,
        partition,
        message,
        key,
        timestamp,
        headers
      }
    }

    async send (message: IMessage | IMessage[] | any): Promise<void> {
      return await new Promise((resolve, reject) => {
        const messages: IMessage[] = !Array.isArray(arguments[0]) ? [arguments[0]] as IMessage[] : arguments[0]

        let rejected = false
        let acksRemaining: number = messages.length

        messages.forEach((msg: IMessage) => {
          try {
            const produceParams = this._toRDKafkaProduceParams(msg)
            this._client.produce(
              produceParams.topic,
              produceParams.partition,
              produceParams.message,
              produceParams.key || undefined,
              produceParams.timestamp || undefined,
              produceParams.headers,
              (err: any, offset?: RDKafka.NumberNullUndefined) => {
                if (err !== null) {
                  this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaProducer - send - Error getting aks from publisher')
                  if (!rejected) {
                    rejected = true
                    reject(err)
                  }
                } else {
                  this.emit('deliveryReport', produceParams.topic, produceParams.partition || null, offset || null)

                  acksRemaining--
                  if (acksRemaining <= 0) {
                    resolve()
                  }
                }
              }
            )
          } catch (err) {
            this._logger?.isErrorEnabled() && this._logger.error('MLKafkaProducer - send ...error !', err)
            reject(err)
          }
        })
      })
    }

    async disconnect (): Promise<void> {
      return await new Promise((resolve, reject) => {
        this._logger?.isInfoEnabled() && this._logger.info('MLKafkaProducer - disconnect called...')
        if (!this._client.isConnected()) {
          this._logger?.isWarnEnabled() && this._logger.warn('MLKafkaProducer - disconnect called but producer is not connected')
          return resolve()
        }
        this._client.disconnect((err: any, _data: RDKafka.ClientMetrics) => {
          if (err) {
            this._logger?.isErrorEnabled() && this._logger.error('MLKafkaProducer - disconnect failed', err)
            return reject(err)
          }
          this._logger?.isInfoEnabled() && this._logger.info('MLKafkaProducer - disconnected.')
          resolve()
        })
      })
    }

    async connect (): Promise<void> {
      return await new Promise((resolve, reject) => {
        this._client.connect(undefined, (err: RDKafka.LibrdKafkaError, metadata: RDKafka.Metadata) => {
          if (err) {
            this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaProducer - error connecting to cluster')
            return reject(new Error(`MLKafkaProducer - error connecting to cluster: ${err.message}`))
          }

          this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaProducer::event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`)
          this._logger?.isInfoEnabled() && this._logger.info('MLKafkaProducer - connected!')
          resolve()
        })
      })
    }

    setDeliveryReportFn (handlerCallback: (message: IMessage) => Promise<void>): void {
      throw new Error('Method not implemented.')
    }

    async destroy (): Promise<void> {
      this._logger?.isInfoEnabled() && this._logger.info('MLKafkaProducer - destroy called...')
      return await this.disconnect()
    }
}
