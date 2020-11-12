const { MongoClient } = require('mongodb');

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

// todo - getCart
// todo - replaceCart

const getCart = async (req, res) => {
  let user = req.params.id;

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("cart").findOne({ "user": user });

    res.status(200).json({ status: 200, message: "Data acquired", data: r.cart })

    dbClose();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Server error. Evacuate." })
  }
}

const replaceCart = async (req, res) => {
  let cart = req.body.cart;
  let user = req.body.user;

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("cart").replaceOne({ "user": user }, { "user": user, cart }, { upsert: true });

    res.status(201).json({ status: 201, message: "data upload complete" });

    dbClose();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "data upload failed." });
  }
}

module.exports = { getCart, replaceCart };