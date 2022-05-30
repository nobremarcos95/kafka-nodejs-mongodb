const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  if (err) {
    console.log('Mongo connect error', err);
    client.close();
    return;
  }

  console.log('Connected!')
  const collection = client.db("test").collection("devices");

  // chamar o kafka_consumer para receber as mensagens
  // verificar no banco se a msg esta vinculada ao usuario (ver como identificar o usuario)
  // se estiver, produzir uma msg de autorizado
  // se n estiver, produzir uma msg de nao autorizado
  // guardar as msgs no banco de dados

  client.close();
});
