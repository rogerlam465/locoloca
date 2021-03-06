const { MongoClient, ObjectID } = require('mongodb');

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
// done - router.post('/api/order/', createOrder);
// todo - router.patch('/api/order/:order', modifyOrderStatus);
// done - router.patch('/api/order/:order/courier/:courier', assignCourier);
// todo - router.delete('/api/order/:order', deleteOrder);

// ideally it would be more fine-grained than this.
// todo - get orders related to a shop
// 
// todo - get all orders for courier page
//    router.get('/api/order/courier/:courierId', getCourierOrders);

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

  console.log("create order");

  let cart = req.body.cart;
  let orders = [];

  let buyerId = req.body.user._id;
  let buyerPostcode = req.body.user.addressPostcode;
  let status = "active";
  let targetDeliveryDate = new Date();
  targetDeliveryDate.setDate(targetDeliveryDate.getDate() + 2);

  let cartTargetSellers = [];

  cart.forEach(item => {
    cartTargetSellers.push(ObjectID(Object.keys(item)[0]));
  })

  try {
    await dbConnect();

    const db = client.db("locoloca");

    // theoretically, the projection field should filter the fields I get back.
    // this absolutely is not happening. I don't know why.

    let fullItemData = await db.collection("items").find({ "_id": { $in: cartTargetSellers } }, { "shop": 1 }).toArray();

    let targetPostcodes = [];

    fullItemData.forEach(item => {
      targetPostcodes.push(ObjectID(item.shop));
    })

    for (let i = 0; i < cartTargetSellers.length; i++) {

      let shopData = await db.collection("shops").findOne({ "_id": targetPostcodes[i] });

      let itemId = cartTargetSellers[i];
      let numToBuy = Number(Object.values(cart[i]));

      let newObj = {
        "itemId": itemId,
        "numToBuy": numToBuy,
        "sellerPostcode": shopData["postcode"],
        "sellerId": shopData["_id"],
        "buyerId": buyerId,
        "buyerPostcode": buyerPostcode,
        "courierId": "N/A",
        "status": status,
        "targetDeliveryDate": targetDeliveryDate,
        "courierId": "N/A"
      }
      orders.push(newObj);
    }

    let r = await db.collection("orders").insertMany(orders);

    dbClose();

    res.status(201).json({ status: 201, message: "oh god it worked" });

  } catch (err) {
    console.log(err);
  }
};

// despite the name of the method, this should actually do two things
// first, it should pull all the orders assigned to the current courier
// second, it should pull all available orders and return the two things

const getCourierOrders = async (req, res) => {

  let courierId = req.params.courierId;

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let data = await db.collection("orders").find({ $or: [{ "courierId": courierId }, { "courierId": "N/A" }] }).toArray();

    res.status(201).json({ status: 201, message: "Data located.", assigned: data })

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};

const getShopOrders = async (req, res) => {

  let shopId = req.params.shop;

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").find({ "sellerId": ObjectID(shopId) }).toArray();

    res.status(201).json({ status: 201, message: "Data recovered.", data: r });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};

const modifyOrderStatus = async (req, res) => {
  let courier = req.body.courierId;
  let orderId = ObjectID(req.body.orderId);
  let status = req.body.status;

  console.log("modify order", status);

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").findOneAndUpdate({ "_id": orderId }, { $set: { "courierId": courier, "status": status } });

    dbClose();

    res.status(201).json({ status: 201, message: "courier assigned." });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};

const assignCourier = async (req, res) => {
  let courier = req.body.courierId;
  let orderId = ObjectID(req.body.orderId);

  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("orders").findOneAndUpdate({ "_id": orderId }, { $set: { "courierId": courier, "status": "assigned" } });

    dbClose();

    res.status(201).json({ status: 201, message: "courier assigned." });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, server error 500." });
  }
};


module.exports = { getOrder, createOrder, modifyOrderStatus, assignCourier, getCourierOrders, getShopOrders };