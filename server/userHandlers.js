// all this mongo connection stuff is gonna be reptitive
// should we abstract this out?

const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

let client;

const dbConnect = async () => {
  try {
    client = MongoClient(MONGO_URI, options);
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

    let user = await db.collection("users").find().toArray();

    res.status(200).json({ status: 200, message: "I fight for the users!", data: user })

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

    let r = await db.collection("users").insertOne(req.body)

    dbClose();

    res.status(201).json({ status: 201, message: "Care package delivered." })

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "The slings and arrows of outrageous fortune! Server error 500." });
  }
}

const modifyUser = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let userId = ObjectID(req.body.id);

    console.log("userId is", userId);

    let r1 = await db.collection("users").findOne({ _id: userId });

    let r = await db.collection("users").updateOne({ _id: userId }, { $set: { "shop": req.body.shop } });

    console.log(r1);

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