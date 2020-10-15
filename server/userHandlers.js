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

// getUser, createUser, modifyUser, deleteUser
// there's got to be a better way of doing this. This is so repetitive.

const getUser = async (req, res) => {
  // obvs. this is going to have to get something from the req body
  // this can't really be done without that.

  try {
    await dbConnect();

    const db = client.db("locoloca");

    await db.collection("users").find();

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Alas, poor Yorick. I knew him, Horatio: server error 500." });
  }
}

const createUser = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "The slings and arrows of outrageous fortune! Server error 500." });
  }
}

const modifyUser = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Full of sound and fury. Server error 500." });
  }
}

const deleteUser = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Men at some times are masters of their fates: server error 500." });
  }
}

module.exports = { getUser, modifyUser, createUser, deleteUser };