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

// DONE - router.get('/api/shop', getShop);
// DONE - router.post('/api/shop', createShop);
// TODO - router.patch('/api/shop', modifyShop);
// TODO - router.delete('/api/shop', deleteShop);

const getShop = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("shops").find().toArray();

    res.status(200).json({ status: 200, message: "Care package acquired.", data: r });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const createShop = async (req, res) => {

  console.log(req.body);

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("shops").insertOne(req.body);

    dbClose();

    res.status(201).json({ status: 201, message: "Care package delivered." })

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const modifyShop = async () => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("shops").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const deleteShop = async () => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("shops").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

module.exports = { getShop, createShop, modifyShop, deleteShop };