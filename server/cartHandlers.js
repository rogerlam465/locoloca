// all this mongo connection stuff is gonna be reptitive
// should we abstract this out?

const { MongoClient } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser = true;
  useUnifiedTopology = true;
}

let client;

const dbConnect = async () => {
  try {
    client = MongoClient(MONGO_URI, options0);
    await client.connect();

    console.log("connected!");
  } catch (err) {
    console.log(err);
  }
};

const dbClose = () => {
  client.close();
  console.log("db disconnected, for the glory of Queen and country");
}

// getCart, addCart, modifyUser, deleteUser