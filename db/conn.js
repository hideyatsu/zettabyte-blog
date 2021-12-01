const { MongoClient } = require("mongodb");
const connectionString = 'mongodb+srv://user_123:user_123@cluster0.eaayl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;