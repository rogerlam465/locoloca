const fetch = require('node-fetch');

const getPostcodes = async (req, res) => {

  const targetLatitude = req.params.lat;
  const targetLongitude = req.params.long;

  // we probably want to use typeof; it doesn't throw a referenceerror exception
  // when faced with an uninitialized variable

  try {

    let r = await fetch("http://api.geonames.org/findNearbyPostalCodesJSON?formatted=true&country=CA&radius=2&username=nine932038&style=short&maxRows=300&lat=" + targetLatitude + "&lng=" + targetLongitude)
      .then(res => res.json())
      .then(json => json)
      .catch(err => { console.log(err) });

    let finalData = r.postalCodes[0].postalCode;

    res.status(200).json({ status: 200, message: "Care package acquired.", data: finalData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Sorry, chief, ain't gonna happen: server error 500." });
  }
};

module.exports = { getPostcodes };