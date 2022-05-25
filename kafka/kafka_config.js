const { Kafka } = require('kafkajs');

const KAFKA_BOOTSTRAP_SERVER = 'localhost:9092';

const kafka = new Kafka({
  clientId: 'gcloud07',
  brokers: [KAFKA_BOOTSTRAP_SERVER],
});

module.exports = kafka;