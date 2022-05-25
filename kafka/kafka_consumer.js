const { Kafka } = require('kafkajs');
const kafka = require('./kafka_config');

const initConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });
  console.log('Connecting consumer..');
  await consumer.connect();
  console.log('Consumer connected! Reading message..');
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}

initConsumer().catch(async (error) => {
  console.log('Kafka consumer error: ', error);
});