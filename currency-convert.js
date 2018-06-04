// load axios module
const axios = require('axios');

// async function
const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exhange rate for ${from} to ${to}.`)
  }
};

// async function
const getCountries = async (currencyCodes) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCodes}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCodes}`)
  }
};

// async function
const convertCurrency = async (from, to, amount) => {
  const exchangeRate = await getExchangeRate(from, to);
  const countriesList = await getCountries(to);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount.toFixed(2)} ${from} is worth ${convertedAmount} ${to}.  You can spend it in the following countries: ${countriesList.join(', ')}`
};

convertCurrency('CAD', 'USD', 20).then((message) => {
  console.log(message);
}).catch((e) => {
  console.log(e.message);
});
