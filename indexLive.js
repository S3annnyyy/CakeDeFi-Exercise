const pricing = require('./priceFunction.js');
const readline = require('readline');
const BigNumber = require('bignumber.js');

// Initialize crytocurrency involed
const CRYPTOCURRENCY = ["BTC", "ETH", "DOGE"];

// Initialize token sale function
function getTokenSale(ethSaleRate, deci, purchCurr, purchAmt, RATE) {
    BigNumber.set({ DECIMAL_PLACES: deci, ROUNDING_MODE: BigNumber.ROUND_DOWN });

    ethSR = BigNumber(ethSaleRate);
    cVR = RATE.get(purchCurr) / RATE.get("ETH");
    tmp = BigNumber(purchAmt).multipliedBy(cVR);
    final = tmp.multipliedBy(ethSR).decimalPlaces(deci).toFixed(deci);
    return final;
}

pricing.getPriceListing(CRYPTOCURRENCY).then((RATE) => {
    const rl = readline.createInterface({
        input: process.stdin,
    });

    rl.on('line', (line) => {
        line = line.split(" ");
        if (line.length === 4) {
        const output = getTokenSale(line[0], parseInt(line[1]), line[2], line[3], RATE);
        console.log(output);
        }
    });
});