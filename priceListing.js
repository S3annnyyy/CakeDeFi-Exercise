// const axios = require('axios');

// let response = null;
// let RATE = new Map();
// const CURRENCY = ["BTC", "ETH", "DOGE"];

// const myPromise = new Promise(async (resolve, reject) => {
//     try {
//         response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC', {
//         headers: {
//             'X-CMC_PRO_API_KEY': '16f42297-b72b-48d8-89b6-fdc256bf3464',
//         },
//         });
//     } catch(ex) {
//         response = null;
//         // error
//         console.log(ex);
//         reject(ex);
//     }
//     if (response) {
//         // success
//         const json = response.data;
//         const price = String(json["data"]["BTC"][0]["quote"]["USD"]["price"]);
//         resolve(price);
//     }
//     });

// myPromise("BTC").then((price)=> {
//   RATE.set("BTC", price);
//   console.log(RATE);
// })

const axios = require('axios');

async function getPriceListing(cryptocurr) {
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${cryptocurr}`, {
      headers: {
        'X-CMC_PRO_API_KEY': '16f42297-b72b-48d8-89b6-fdc256bf3464',
      },
    });

    const json = response.data;
    const price = String(json["data"][cryptocurr][0]["quote"]["USD"]["price"]);

    return price;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {getPriceListing};