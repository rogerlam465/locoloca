const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID
const fetch = require('node-fetch');

require("dotenv").config();
const { MONGO_URI, GEONAMES_USER } = process.env;

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

// item fetch routes

const getItem = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    let r = await db.collection("items").find().toArray();

    res.status(200).json({ status: 200, data: r, message: "TARGET LOCATED." });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const getAllItems = async (req, res) => {
  try {
    await dbConnect();

    const db = client.db("locoloca");

    // currently this fetches all items. Later we'll want to just find
    // one item by its _id

    let r = [];

    if (req.params.id) {
      r = await db.collection("items").find({ "shop": req.params.id }).toArray();
    } else {
      r = await db.collection("items").find().toArray();
    };

    console.log(r);

    res.status(200).json({ status: 200, data: r, message: "TARGET LOCATED." });

    dbClose();

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

const getAllItemsByPostCode = async (req, res) => {

  // the goal here is to grab the targetPostcode provided by the front end
  // grab all the sellers IDs in the surrounding 20km
  // grab all items from all sellers and return a megaobject containing all the items
  // oh my aching head

  const targetPostcode = req.params.postcode;

  try {

    let r = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?formatted=true&country=CA&radius=20&username=${GEONAMES_USER}&style=short&maxRows=300&postalcode=${targetPostcode}`)
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(err => { console.log(err) });

    let postcodes = [];

    r["postalCodes"].length > 0 ?
      r["postalCodes"].map(item => {
        postcodes.push(item.postalCode);
      }) :
      postcodes.push("No items in this area.");

    await dbConnect();

    const db = client.db("locoloca");

    // this returns only the seller IDs in the format of an array assuming one postcode
    // this is obviously not optimal.
    let shopFind = await db.collection("shops").distinct("_id", { postcode: { $regex: postcodes, $options: 'mi' } });

    // grab all items from the array of seller IDs

    let allItems = await db.collection("items").find({ shop: { $in: shopFind } }).toArray();

    dbClose();

    res.status(200).json({ status: 200, message: "Care package acquired.", data: allItems });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

// item management routes

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

module.exports = { getItem, getAllItems, createItem, modifyItem, deleteItem, getAllItemsByPostCode };