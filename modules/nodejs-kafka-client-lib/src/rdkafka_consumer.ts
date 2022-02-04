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

import * as RDKafka from 'node-rdkafka'
import { ILogger } from '@mojaloop/logging-bc-logging-client-lib'
import { IMessageConsumer, IMessage } from '@mojaloop/platform-shared-lib-messaging-types-lib'

export enum MLKafkaConsumerOutputType {
  Raw,
  String,
  Json
}

const defaultOptions = {
  useSyncCommit: false,
  outputType: MLKafkaConsumerOutputType.Json
}

export class MLKafkaConsumerOptions {
    kafkaBrokerList: string
    kafkaGroupId?: string
    useSyncCommit?: boolean
    outputType?: MLKafkaConsumerOutputType
}

export class MLKafkaConsumer implements IMessageConsumer {
    private readonly _logger: ILogger | null
    private _options: MLKafkaConsumerOptions
    private _globalConfig: RDKafka.ConsumerGlobalConfig
    private readonly _topicConfig: RDKafka.ConsumerTopicConfig
    private _topics: string[]
    private readonly _client: RDKafka.KafkaConsumer
    private _handlerCallback: (message: IMessage) => Promise<void>
    private _filterFn: (message: IMessage) => boolean

    constructor (options: MLKafkaConsumerOptions, logger: ILogger | null = null) {
      this._options = options || defaultOptions
      this._logger = logger

      // parse options and apply defaults
      this._parseOptionsAndApplyDefault()

      this._client = new RDKafka.KafkaConsumer(this._globalConfig, this._topicConfig)

      this._client.on('ready', this._onReady.bind(this))
      this._client.on('event.log', this._onLog.bind(this))
      this._client.on('event.error', this._onError.bind(this))
      this._client.on('event.throttle', this._onThrottle.bind(this))
      this._client.on('event.stats', this._onStats.bind(this))
      this._client.on('disconnected', this._onDisconnect.bind(this))
      this._client.on('data', this._onData.bind(this))

      this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - instance created')
      this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - features: ${RDKafka.features.toString()}`)
    }

    private _parseOptionsAndApplyDefault (): void {
      if (this._options.useSyncCommit === undefined) {
        this._options.useSyncCommit = defaultOptions.useSyncCommit
      }
      if (this._options.outputType === undefined) {
        this._options.outputType = defaultOptions.outputType
      }

      // global client options
      this._globalConfig = {
        'metadata.broker.list': this._options.kafkaBrokerList
      }
      if (this._options.kafkaGroupId) {
        this._globalConfig['group.id'] = this._options.kafkaGroupId
      }
    }

    private _onReady (info: RDKafka.ReadyInfo, metadata: RDKafka.Metadata): void {
      this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - event.ready - info: ${JSON.stringify(info, null, 2)}`)
      this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - event.ready - metadata: ${JSON.stringify(metadata, null, 2)}`)
    }

    private _onError (error: RDKafka.LibrdKafkaError): void {
      this._logger?.isErrorEnabled() && this._logger.error(`MLKafkaConsumer - event.error - ${JSON.stringify(error, null, 2)}`)
    }

    private _onThrottle (eventData: any): void {
      this._logger?.isWarnEnabled() && this._logger.warn(`MLKafkaConsumer - event.throttle - ${JSON.stringify(eventData, null, 2)}`)
    }

    private _onLog (eventData: any): void {
      this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - event.log - ${JSON.stringify(eventData, null, 2)}`)
    }

    private _onStats (eventData: any): void {
      this._logger?.isDebugEnabled() && this._logger.debug(`MLKafkaConsumer - event.stats - ${eventData.message}`)
    }

    private _onDisconnect (metrics: RDKafka.ClientMetrics): void {
      if (metrics?.connectionOpened) {
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - event.disconnected - connected for ${(Date.now() - metrics.connectionOpened) / 1000} secs`)
      } else {
        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - event.disconnected - ${JSON.stringify(metrics, null, 2)}`)
      }
    }

    private async _onData (kafkaMessage: RDKafka.Message): Promise<void> {
      if (!kafkaMessage) {
        this._logger?.isErrorEnabled() && this._logger.error('MLKafkaConsumer - Received null message')
        return
      }

      const msg = this._toIMessage(kafkaMessage)
      if (this._filterFn && !this._filterFn(msg)) {
        this._logger?.isDebugEnabled() && this._logger.debug('MLKafkaConsumer - ignoring message filtered out by filterFunction')
        if (this._globalConfig['enable.auto.commit'] !== true) {
          // We are ignoring this message, but if we don't commit it and there will be no more messages that we can commit,
          // then all the ignored messages will appear "stuck". Everything reports lag.
          this._commitMsg(kafkaMessage)
        }
        return
      }

      // call the provided handler and then commit
      await this._handlerCallback(msg)
      this._commitMsg(kafkaMessage)
    }

    private _toIMessage (kafkaMsg: RDKafka.Message): IMessage {
      const msg: IMessage = {
        topic: kafkaMsg.topic,
        key: null,
        value: null,
        timestamp: kafkaMsg.timestamp ?? null,
        headers: null
      }

      // parse msg key
      if (kafkaMsg.key) {
        if (this._options.outputType === MLKafkaConsumerOutputType.Raw) {
          msg.key = kafkaMsg.key
        } else {
          msg.key = kafkaMsg.key.toString()
        }
      }

      // parse msg value
      if (kafkaMsg.value != null) {
        if (this._options.outputType === MLKafkaConsumerOutputType.Json) {
          try {
            msg.value = JSON.parse(kafkaMsg.value.toString())
          } catch (err) {
            this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaConsumer - error converting msg value to JSON')
          }
        } else if (this._options.outputType === MLKafkaConsumerOutputType.String) {
          msg.value = kafkaMsg.value.toString()
        } else {
          msg.value = kafkaMsg.value
        }
      }

      // parse msg headers
      if (kafkaMsg.headers != null) {
        msg.headers = []
        kafkaMsg.headers.forEach((kafkaHeader: RDKafka.MessageHeader) => {
          // NOTE: kafka headers are key/value pairs, only one pair will ever exist per header rec
          for (const key in kafkaHeader) {
            if (!kafkaHeader.hasOwnProperty(key)) continue

            if (this._options.outputType === MLKafkaConsumerOutputType.Json || this._options.outputType === MLKafkaConsumerOutputType.String) {
              msg.headers!.push({ [key]: kafkaHeader[key].toString() })
            } else {
              msg.headers!.push({ [key]: kafkaHeader[key] })
            }
          }
        })
      }
      /// TODO parse msg timestamp to datetime obj

      return msg
    }

    private _commitMsg (kafkaMessage: RDKafka.Message): void {
      if (this._globalConfig['enable.auto.commit'] !== true) {
        if (this._options.useSyncCommit) {
          this._client.commitMessageSync(kafkaMessage)
        } else {
          this._client.commitMessage(kafkaMessage)
        }
      }
    }

    setCallbackFn (handlerCallback: (message: IMessage) => Promise<void>): void {
      this._handlerCallback = handlerCallback
    }

    setFilteringFn (filterFn: (message: IMessage) => boolean): void {
      this._filterFn = filterFn
    }

    setTopics (topics: string[]): void {
      this._topics = topics
    }

    async destroy (force: boolean): Promise<void> {
      this._logger?.isInfoEnabled() && this._logger.info('MLKafkaProducer - destroy called...')
      return await this.disconnect()
    }

    async connect (): Promise<void> {
      return await new Promise((resolve, reject) => {
        this._client.connect({ topic: this._topics[0], allTopics: false }, (err: RDKafka.LibrdKafkaError, metadata: RDKafka.Metadata) => {
          if (err) {
            this._logger?.isErrorEnabled() && this._logger.error(err, 'MLKafkaConsumer - error connecting to cluster')
            return reject(new Error(`MLKafkaConsumer - error connecting to cluster: ${err.message}`))
          }

          // metadata is handled by the onReady event
          this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - connected!')
          resolve()
        })
      })
    }

    async disconnect (): Promise<void> {
      return await new Promise((resolve, reject) => {
        this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - disconnect called...')
        if (!this._client.isConnected()) {
          this._logger?.isWarnEnabled() && this._logger.warn('MLKafkaConsumer - disconnect called but consumer is not connected')
          return resolve()
        }
        this._client.disconnect((err: any, _data: RDKafka.ClientMetrics) => {
          if (err) {
            this._logger?.isErrorEnabled() && this._logger.error('MLKafkaConsumer - disconnect failed', err)
            return reject(err)
          }
          this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - disconnected.')
          resolve()
        })
      })
    }

    async start (): Promise<void> {
      return await new Promise((resolve, reject) => {
        if (!this._client.isConnected()) {
          const err = new Error('MLKafkaConsumer - Client is not connected, cannot start()')
          this._logger?.isErrorEnabled() && this._logger.error(err)
          reject(err)
        }

        this._logger?.isInfoEnabled() && this._logger.info(`MLKafkaConsumer - Subscribing to topics ${JSON.stringify(this._topics)}`)
        if (Array.isArray(this._topics) && this._topics.length > 0) {
          this._client.subscribe(this._topics)
        }

        this._client.consume()
        this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - started')

        resolve()
      })
    }

    async stop (): Promise<void> {
      this._client.unsubscribe()
      this._logger?.isInfoEnabled() && this._logger.info('MLKafkaConsumer - stop called, unsubscribed from previously subscribed topics')
    }
}
