const kafka = require('./kafka_config');

const initConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'messages' });
  console.log('Connecting consumer..');
  await consumer.connect();
  console.log('Kafka Consumer connected! Reading message..');
  await consumer.subscribe({ topic: 'return_messages', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Consumer', {
        value: message.value.toString(),
      });
    },
  });
}

initConsumer().catch(async (error) => {
  console.log('Kafka Consumer error: ', error);
});