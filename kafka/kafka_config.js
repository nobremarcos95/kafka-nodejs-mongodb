const { Kafka } = require('kafkajs');

// localhost:9092
// sasl mechanism: scram-sha-512
const KAFKA_BOOTSTRAP_SERVER = 'pkc-4v5zz.sa-east-1.aws.confluent.cloud:9092';

const kafka = new Kafka({
  clientId: 'gcloud07',
  brokers: [KAFKA_BOOTSTRAP_SERVER],
  sasl: {
    mechanism: 'PLAIN',
    username: 'CO3E7X7OZSK6I6XI',
    password: 'lyOzdock67vBnN279D5yNJ1gfw5qfg86DEvgzTFkGa+fyS/IyAe3ztFIbIhTW+T/'
  },
  ssl: { rejectUnauthorized: false }
});

module.exports = kafka;