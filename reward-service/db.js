const { MongoClient } = require('mongodb');

const config = require('./config');

let _client;
let _db;

async function createDatabase(url) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  _client = client;
  _db = client.db(config.mongodb.database);
  return client.connect();
}

function getClient() {
  return _client;
}

function getDb() {
  return _db;
}

module.exports = {
  createDatabase,
  getClient,
  getDb,
};
