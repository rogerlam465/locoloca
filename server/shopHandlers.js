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

const getShop = async () => {
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

const createShop = async () => {
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