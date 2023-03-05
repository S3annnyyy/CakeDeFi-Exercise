const axios = require('axios');
const BigNumber = require('bignumber.js');
require('dotenv').config()

async function getLivePrice(cryptocurr) {
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
    // console.log(error);
    return null;
  }
}

function getTokenSale(ethSaleRate, deci, purchCurr, purchAmt, RATE) {
  BigNumber.set({ DECIMAL_PLACES: deci, ROUNDING_MODE: BigNumber.ROUND_DOWN });

  ethSR = BigNumber(ethSaleRate);
  cVR = RATE.get(purchCurr) / RATE.get("ETH");
  tmp = BigNumber(purchAmt).multipliedBy(cVR);
  final = tmp.multipliedBy(ethSR).decimalPlaces(deci).toFixed(deci);
  return final;
}


module.exports = {getLivePrice, getTokenSale};