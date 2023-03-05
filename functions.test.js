const axios = require('axios');
jest.mock("axios");
require('dotenv').config()
const p = require('./functions.js');
const RATE = new Map([['BTC','3825.281112'], ['ETH', '138.8911'], ['DOGE', '0.00198422341298374987']]);
const CRYPTOCURRENCY = ["BTC", "ETH", "DOGE"];

describe('Testing getTokenSale function', () => {
    test('Function correctly calculates ETHSALE: 1.5 ETH PA: 3.5 TO 3 DECIMAL PLACES',() => {
        ts = ["1.5", "3", "ETH", "3.5"];
        expect(p.getTokenSale(ts[0], parseInt(ts[1]), ts[2], ts[3], RATE)).toBe('5.250')
    });
    
    test('Function correctly calculates ETHSALE: 6540825.876543210987654325 ETH PA:992465.123456789012345678 TO 18 DECIMAL PLACES',() => {
        ts = ["6540825.876543210987654325", "18", "ETH", "992465.123456789012345678"];
        expect(p.getTokenSale(ts[0], parseInt(ts[1]), ts[2], ts[3], RATE)).toBe('6491541561072.818099748528072316')
    });
    
    test('Function correctly calculates ETHSALE: 6540825.876543210987654325 DOGE PA: 992465.123456789012345678 TO 18 DECIMAL PLACES with conversion',() => {
        ts = ["6540825.876543210987654325", "18", "DOGE", "992465.123456789012345678"];
        expect(p.getTokenSale(ts[0], parseInt(ts[1]), ts[2], ts[3], RATE)).toBe('92739338.602961358374866197')
    });
})

describe('Testing getLivePrice function', () => {
    test('Testing successful API call', async () => {
        axios.get.mockResolvedValueOnce(RATE);
        await p.getLivePrice(CRYPTOCURRENCY);
        expect(axios.get).toHaveBeenCalledWith(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC`, {headers: {'X-CMC_PRO_API_KEY': process.env.API_KEY,},});
        
    });

    test('Testing unsuccessful API call', async () => {
        axios.get.mockResolvedValueOnce(RATE);
        const result = await p.getLivePrice(CRYPTOCURRENCY);
        expect(result).toEqual(null);
    });
})

