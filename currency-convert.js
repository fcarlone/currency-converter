// http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6
// load axios module
const axios = require('axios');

// async
const getExchangeRate = async (from, to) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6');
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

// async
const getCountries = async (currencyCodes) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCodes}`);
  return response.data.map((country) => country.name);
};

// convert currency with Promise
const convertCurrency = (from, to, amount) => {
  // fix scoping issues
  let convertedAmount;
  return getExchangeRate(from, to).then((rate) => {
    convertedAmount = (amount * rate).toFixed(2);
    // console.log(convertedAmount);
    return getCountries(to);
  }).then((countries) => {
    // console.log(countries)
    return `${amount.toFixed(2)} ${from} is worth ${convertedAmount} ${to}.  You can spend it in the following countries: ${countries.join(', ')}`;
  });
};

// // get exchange rate
// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });
//
// // get list of countries
// getCountries('EUR').then((countries) => {
//   console.log(countries);
// });

convertCurrency('CAD', 'USD', 20).then((message) => {
  console.log(message);
});
