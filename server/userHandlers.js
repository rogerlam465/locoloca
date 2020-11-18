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
  console.log("db disconnected");
}

// getUser, createUser, modifyUser, deleteUser
// there's got to be a better way of doing this. This is so repetitive.

const validateUserPassword = async (req, res) => {
  let email = req.body.emailAddress;
  let password = req.body.password;

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let data = await db.collection("users").findOne({ "email": email });

    if (data === null) {
      res.status(404).json({ status: 404, message: "No data found." });
    } else if (password !== data.password) {
      res.status(401).json({ status: 401, message: "Unauthorized.", auth: false });
    } else if (password === data.password) {
      res.status(200).json({ status: 200, message: "All OK.", auth: true, userId: data._id });
    }

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Men at some times are masters of their fates: server error 500." });
  }
}

const getUser = async (req, res) => {

  let userId = req.params.id;

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let user = await db.collection("users").findOne({ "_id": ObjectID(userId) });

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

    let userExists = await db.collection("users").findOne({ "email": req.body.email });

    if (userExists !== null) {
      res.status(403).json({ status: 403, message: "Email already in database" });
    } else {
      await db.collection("users").insertOne(req.body);
      res.status(201).json({ status: 201, message: "Care package delivered." });
    }

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

module.exports = { getUser, modifyUser, createUser, deleteUser, validateUserPassword };