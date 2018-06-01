// load axios module
const axios = require('axios');

// async function
const getExchangeRate = async (from, to) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6');
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

// async function
const getCountries = async (currencyCodes) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCodes}`);
  return response.data.map((country) => country.name);
};

// async function
const convertCurrency = async (from, to, amount) => {
  const exchangeRate = await getExchangeRate(from, to);
  const countriesList = await getCountries(to);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount.toFixed(2)} ${from} is worth ${convertedAmount} ${to}.  You can spend it in the following countries: ${countriesList.join(', ')}`
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
