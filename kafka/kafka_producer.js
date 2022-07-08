const { Partitioners } = require('kafkajs');
const kafka = require('./kafka_config');

const initProducer = async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  });

  await producer.connect();
  console.log('Kafka Producer connected!');

  const message = { key: 'xD' };
  const sendNewMessage = async () => {
    await producer.send({
      topic: 'users',
      messages: [
        { value: JSON.stringify(message) },
      ],
    });

    console.log('Message sent!');
  }

  const interval = setInterval(sendNewMessage, 4000);
  setTimeout(async () => {
    clearInterval(interval);
    await producer.disconnect();
    console.log('Kafka Producer disconnected!');
  }, 60000);
}

initProducer().catch((error) => {
  console.log('Kafka Producer error: ', error);
});