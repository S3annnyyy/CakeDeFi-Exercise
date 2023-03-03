const pricing = require('./priceListing');
const readline = require('readline');
const BigNumber = require('bignumber.js');

const rl = readline.createInterface({
    input: process.stdin,
});

// Initialize Map
let RATE = new Map();
const CURRENCY = ["BTC", "ETH", "DOGE"];

// Initialize token sale function
function getTokenSale(ethSaleRate, deci, purchCurr, purchAmt) {
    BigNumber.set({ DECIMAL_PLACES: deci, ROUNDING_MODE: BigNumber.ROUND_DOWN });

    ethSR = BigNumber(ethSaleRate);
    cVR = RATE.get(purchCurr) / RATE.get("ETH");
    tmp = BigNumber(purchAmt).multipliedBy(cVR);
    final = tmp.multipliedBy(ethSR).decimalPlaces(deci).toFixed(deci);
    return final;
}

// Retrieve live cryptocurrency data
async function f1() {
    try {
    for (let i=0; i<CURRENCY.length; i++) {
        tmp = await pricing.getPriceListing(CURRENCY[i]);
        RATE.set(CURRENCY[i], await tmp);
    }
    } catch (error) {
      console.log(error);
    }
  }

async function execute() {
    await f1();
    rl.on('line', (line) => {
        line = line.split(" ");
        if (line.length === 4) {
        // const output = getTokenSale(line[0], parseInt(line[1]), line[2], line[3]);
        // console.log(output);
        }
        console.log("heli");
    });
}
execute();