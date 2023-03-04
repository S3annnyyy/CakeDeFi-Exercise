const axios = require('axios');
require('dotenv').config()

async function getPriceListing(cryptocurr) {
  let RATE = new Map();
  try {
    for await (curr of cryptocurr) {
      const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${curr}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      },
    });

    const json = response.data;
    const price = String(json["data"][curr][0]["quote"]["USD"]["price"]);
    RATE.set(curr, price);
    }
    return RATE;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// TEST
// getPriceListing(["BTC", "ETH", "DOGE"]).then((RATE) => {
//   console.log(RATE);

// });

module.exports = {getPriceListing};