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
  console.log("db disconnected");
}

// done - router.get('/api/order', getOrder);
// todo - router.post('/api/order/', createOrder);
// todo - router.patch('/api/order/Order', modifyOrderStatus);
// todo - router.patch('/api/order/:order/courier/:courier', assignCourier);
// todo - router.delete('/api/order/:order', deleteOrder);

const getOrder = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    // should pull all orders
    // for the purposes of shop-related orders, we'll filter in FE
    // I don't even know how we're going to do that, but we'll figure it out

    let r = await db.collection("orders").find().toArray();

    res.status(200).json({ status: 200, data: r, message: "TARGET LOCATED." });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};

const createOrder = async (req, res) => {

  // seller id
  // seller location
  // buyer id
  // buyer location
  // courier id
  // status
  // delivery deadline

  try {
    await dbConnect();

    const db = client.db("locoloca");

    console.log(req.body);

    let r = await db.collection("orders").insertOne(req.body)

    dbClose();

    res.status(201).json({ status: 201, message: "Care package delivered." })

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};

const modifyOrderStatus = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};

const assignCourier = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").find().toArray();

    console.log(r);

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};


module.exports = { getOrder, createOrder, modifyOrderStatus, assignCourier };