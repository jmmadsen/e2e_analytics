const MongoClient = require('mongodb').MongoClient;


const connectMongoDB = async () => {

  try {

    const url = process.env.MONGODB_URL;
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    return client;

  } catch(err) {

    console.error(err);

  }

}

module.exports = connectMongoDB;