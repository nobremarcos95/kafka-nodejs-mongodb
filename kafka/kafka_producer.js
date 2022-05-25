const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')

const kafka = require('./kafka_config');

const initProducer = async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  });

  await producer.connect();
  console.log('Producer connected! Sending message...');

  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello, deu bom!!' },
    ],
  });

  console.log('Message sent! Disconnecting...');
  console.log('Producer disconnected!');
  await producer.disconnect();
}

initProducer().catch((error) => {
  console.log('Kafka producer error: ', error);
});