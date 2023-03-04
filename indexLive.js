const p = require('./functions.js');
const readline = require('readline');

// Initialize array of crytocurrency involved
const CRYPTOCURRENCY = ["BTC", "ETH", "DOGE"];

p.getLivePrice(CRYPTOCURRENCY).then((RATE) => {
    const rl = readline.createInterface({
        input: process.stdin,
    });

    rl.on('line', (line) => {
        line = line.split(" ");
        if (line.length === 4) {
        const output = p.getTokenSale(line[0], parseInt(line[1]), line[2], line[3], RATE);
        console.log(output);
        }
    });
});