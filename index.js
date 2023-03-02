const readline = require('readline');
const BigNumber = require('bignumber.js');

const rl = readline.createInterface({
    input: process.stdin,
});

// Initialize Map
let RATE = new Map();
const CURRENCY = ["BTC", "ETH", "DOGE"];

// Initialize token sale function
function MathRound(num, nrdecimals) {
    let n = num.toFixed(nrdecimals);
    return (n > num) ? n-(1/(Math.pow(10,nrdecimals))) : n;
}

function getTokenSale(ethSaleRate, deci, purchCurr, purchAmt) {
    deci_place = parseInt(deci);
    BigNumber.set({ DECIMAL_PLACES: deci_place });
    if (purchCurr === "ETH") {
        if (ethSaleRate.length > 10 || purchAmt.length > 10) {
            x = new BigNumber(ethSaleRate);
            y = new BigNumber(purchAmt);
            z = y.multipliedBy(x).decimalPlaces(deci_place).toFixed(deci_place);
        } else {
            test = parseFloat(ethSaleRate*purchAmt);
            z = MathRound(test, deci_place).toString();
        }
        } else {
            if (ethSaleRate.length > 10 || purchAmt.length > 10) {
                x = new BigNumber(ethSaleRate);
                y = new BigNumber(purchAmt * (RATE.get(purchCurr) / RATE.get("ETH")));
                z = y.multipliedBy(x).decimalPlaces(deci_place).toFixed(deci_place);
            } else {
                test = parseFloat(ethSaleRate*(purchAmt* (RATE.get(purchCurr) / RATE.get("ETH"))));
                z = MathRound(test, deci_place).toString();
            }
        }
        return z;
}

rl.on('line', (line) => {
    line = line.split(" ");
    if (line.length === 3) {
        // store values in Map
        for (let i=0; i<line.length; i++) {
            RATE.set(CURRENCY[i], line[i]);
        }
        // console.log(RATE);
    } else {
        const output = getTokenSale.apply(this, line);
        console.log(output);
    }
});