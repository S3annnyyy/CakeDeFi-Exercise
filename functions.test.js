const p = require('./functions.js');
const RATE = new Map([['BTC','3825.281112'], ['ETH', '138.8911'], ['DOGE', '0.00198422341298374987']]);

test('getTokenSale function correctly calculates ETHSALE: 1.5 ETH PA: 3.5 TO 3 DECIMAL PLACES',() => {
    ts = ["1.5", "3", "ETH", "3.5"];
    expect(p.getTokenSale(ts[0], parseInt(ts[1]), ts[2], ts[3], RATE)).toBe('5.250')
})

test('getTokenSale function correctly calculates ETHSALE: 6540825.876543210987654325 ETH PA:992465.123456789012345678 TO 18 DECIMAL PLACES',() => {
    ts = ["6540825.876543210987654325", "18", "ETH", "992465.123456789012345678"];
    expect(p.getTokenSale(ts[0], parseInt(ts[1]), ts[2], ts[3], RATE)).toBe('6491541561072.818099748528072316')
})

test('getTokenSale function correctly calculates ETHSALE: 6540825.876543210987654325 DOGE PA: 992465.123456789012345678 TO 18 DECIMAL PLACES',() => {
    ts = ["6540825.876543210987654325", "18", "DOGE", "992465.123456789012345678"];
    expect(p.getTokenSale(ts[0], parseInt(ts[1]), ts[2], ts[3], RATE)).toBe('92739338.602961358374866197')
})

