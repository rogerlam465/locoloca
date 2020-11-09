const fetch = require('node-fetch');

const getPostcodes = async (req, res) => {

  const targetPostcode = req.params.postcode;

  // we probably want to use typeof; it doesn't throw a referenceerror exception
  // when faced with an uninitialized variable

  try {

    let r = await fetch("http://api.geonames.org/findNearbyPostalCodesJSON?formatted=true&country=CA&radius=20&username=nine932038&style=short&maxRows=300&postalcode=" + targetPostcode)
      .then(res => res.json())
      .then(json => json)
      .catch(err => { console.log(err) });

    let postcodes = [];

    r["postalCodes"].length > 0 ?
      r["postalCodes"].map(item => {
        postcodes.push(item.postalCode);
      }) :
      postcodes.push("No items in this area.");

    res.status(200).json({ status: 200, message: "Care package acquired.", data: postcodes });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

module.exports = { getPostcodes };