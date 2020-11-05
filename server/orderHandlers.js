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

// router.get('/api/order', getorder);
// router.post('/api/order', createorder);
// router.patch('/api/order', modifyorder);
// router.delete('/api/order', deleteorder);

const getOrder = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    // should pull all orders related to one seller

    let r = await db.collection("orders").find().toArray();

    console.log(r);

    res.status(200).json({ status: 200, data: r, message: "TARGET LOCATED." });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const createOrder = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    console.log(req.body);

    let r = await db.collection("orders").insertOne(req.body)

    dbClose();

    res.status(201).json({ status: 201, message: "Care package delivered." })

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const modifyOrder = async () => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const deleteOrder = async () => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

module.exports = { getOrder, createOrder, modifyOrder, deleteOrder };