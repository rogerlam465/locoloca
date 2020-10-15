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

// router.get('/api/shop', getShop);
// router.post('/api/shop', createShop);
// router.patch('/api/shop', modifyShop);
// router.delete('/api/shop', deleteShop);

const getItem = async () => {
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

const createItem = async () => {
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

module.exports = { getShop, createshop, modifyShop, deleteShop };