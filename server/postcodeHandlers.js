const fetch = require('node-fetch');

const getPostcodes = async (req, res) => {

  const targetPostcode = req.params.postcode;

  try {

    let r = await fetch("http://api.geonames.org/findNearbyPostalCodesJSON?formatted=true&country=CA&radius=10&username=nine932038&style=short&postalcode=" + targetPostcode)
      .then(res => res.json())
      .then(json => json)
      .catch(err => { console.log(err) });

    let postcodes = [];

    r["postalCodes"].map(item => {
      postcodes.push(item.postalCode);
    });

    res.status(200).json({ status: 200, message: "Care package acquired.", data: postcodes });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

module.exports = { getPostcodes };