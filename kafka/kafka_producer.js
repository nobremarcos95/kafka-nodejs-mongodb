const { Partitioners } = require('kafkajs');
const kafka = require('./kafka_config');
const sampleData = require('./sample_data.json');


const initProducer = async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  });

  await producer.connect();
  console.log('Kafka Producer connected!');

  const sendNewMessage = async () => {
    const randomIndex = Math.floor(Math.random() * sampleData.requests.length);
    const message = sampleData.requests[randomIndex];

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