const { MongoClient, ServerApiVersion } = require('mongodb');
const kafka = require('../kafka/kafka_config');
const { Partitioners } = require('kafkajs');

const mongoURI = "mongodb+srv://gcloud07:ssc0158g072022@gcloud07.kk7msqf.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

mongoClient.connect(async (err) => {
  if (err) {
    console.log('MongoDB connect error', err);
    mongoClient.close();
    return;
  }

  console.log('MongoDB connected!')
  const usersCollection = mongoClient.db("kafka").collection("users");

  //  Initializing Kafka producer
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  });
  await producer.connect();
  
  // Initializing Kafka consumer
  const consumer = kafka.consumer({ groupId: 'users' });
  await consumer.connect();

  await consumer.subscribe({ topic: 'users', fromBeginning: true});
  console.log('Kafka: consuming to \'users\'...');
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const receivedMsg = (JSON.parse(message.value.toString()));
      const { key = '' } = receivedMsg;
      console.log('New request:', receivedMsg);

      const foundUser = await usersCollection.findOne({ key });
      if (foundUser && Object.keys(foundUser).length) {
        const returnMsg = {
          status: 'OK',
          message: `Bem-vindo, ${foundUser.name}`,
        };

        await producer.send({
          topic: 'return_messages',
          messages: [{
            value: JSON.stringify(returnMsg),
          }],
        });

        return;
      }

      const returnMsg = {
        status: 'ERROR',
        message: `Acesso não autorizado`,
      };

      await producer.send({
        topic: 'return_messages',
        messages: [{
          value: JSON.stringify(returnMsg),
        }],
      });
    },
  });

  setTimeout(async () => {
    await producer.disconnect();
    await consumer.disconnect();
    await mongoClient.close();
    console.log('Connection to MongoDB closed!');
  }, 60000);
});