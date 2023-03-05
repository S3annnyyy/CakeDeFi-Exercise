## CakeDeFi Internship Exercise

### Libaries used:
1. [Bignumber.js](https://github.com/MikeMcl/bignumber.js) [For calculation]
2. [Axios](https://axios-http.com/docs/intro) [For HTTP request to get live cryptocurrency data]
3. [Jest](https://jestjs.io/) [For unit testing]

### API used: [CoinMarketCap](https://coinmarketcap.com/api/)

To get results run, `node indexLive.js < inputLive.txt` 

For unit testing run, `npm test`

### Bonus Question Answer: 
#### SALE amount is rounded down to ensure accuracy and consistency in cryptocurrency transactions
Example: The smallest unit of Bitcoin is 1 satoshi which equates to 0.00000001 BTC. To sell 1.5 satoshi would be impossible as 1 satoshi is the smallest unit and 
cannot be further divided into smaller fractions
