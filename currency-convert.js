// http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6
// load axios module
const axios = require('axios');

// use standard Promises
// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6').then((response) => {
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   })
// };

// use async
const getExchangeRate = async (from, to) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=66a4222cd9f915f9f1a198a96f9ca6d6');
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

// use standard Promises
// const getCountries = (currencyCodes) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCodes}`).then((response) => {
//     return response.data.map((country) => {
//       return country.name;
//     });
//   });
// };

// use async
const getCountries = async (currencyCodes) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCodes}`);
  return response.data.map((country) => country.name);

  // return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCodes}`).then((response) => {
  //   return response.data.map((country) => {
  //     return country.name;
  //   });
  // });
};

// get actual exchange rate
getExchangeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
});

// get list of countries
getCountries('EUR').then((countries) => {
  console.log(countries);
})
