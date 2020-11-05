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

// router.get('/api/item', getItem);
// router.get('/api/item/all', getAllItems);
// router.post('/api/item', createItem);
// router.patch('/api/item', modifyItem);
// router.delete('/api/item', deleteItem);

const getItem = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    // currently this fetches all items. Later we'll want to just find
    // one item by its _id

    let r = await db.collection("items").find().toArray();

    console.log(r);

    res.status(200).json({ status: 200, data: r, message: "TARGET LOCATED." });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const getAllItem = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    // currently this fetches all items. Later we'll want to just find
    // one item by its _id

    let r = await db.collection("items").find().toArray();

    console.log(r);

    res.status(200).json({ status: 200, data: r, message: "TARGET LOCATED." });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const createItem = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    console.log(req.body);

    let r = await db.collection("items").insertOne(req.body)

    dbClose();

    res.status(201).json({ status: 201, message: "Care package delivered." })

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const modifyItem = async () => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("items").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const deleteItem = async () => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("items").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

module.exports = { getItem, createItem, modifyItem, deleteItem };