import * as RDKafka from 'node-rdkafka'

const producer = new RDKafka.Producer({
  // 'debug' : 'all',
  'metadata.broker.list': 'localhost:9092',
  dr_cb: true // delivery report callback
})

const topicName = 'TestTopic'

// logging debug messages, if debug is enabled
producer.on('event.log', function (log) {
  console.log(log)
})

// logging all errors
producer.on('event.error', function (err) {
  console.error('Error from producer')
  console.error(err)
})

// counter to stop this sample after maxMessages are sent
let counter = 0
const maxMessages = 10

producer.on('delivery-report', function (err, report) {
  console.log('delivery-report: ' + JSON.stringify(report))
  counter++
})

// Wait for the ready event before producing
producer.on('ready', function (arg) {
  console.log('producer ready.' + JSON.stringify(arg))

  for (let i = 0; i < maxMessages; i++) {
    const value = JSON.stringify({ prop: 'value-' + i })
    const key = 'key-' + i
    // if partition is set to -1, librdkafka will use the default partitioner
    const partition = -1

    const headers: RDKafka.MessageHeader[] = [
      { key1: Buffer.from('testStr') }
    ]

    producer.produce(topicName, partition, Buffer.from(value), key, null, null, headers)
  }

  // need to keep polling for a while to ensure the delivery reports are received
  var pollLoop = setInterval(function () {
    producer.poll()
    if (counter === maxMessages) {
      clearInterval(pollLoop)
      producer.disconnect()
    }
  }, 1000)
})

producer.on('disconnected', function (arg) {
  console.log('producer disconnected. ' + JSON.stringify(arg))
})

// starting the producer
producer.connect()
