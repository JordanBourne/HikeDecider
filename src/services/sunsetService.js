const axios = require('axios');

const baseUrl = 'https://api.sunrise-sunset.org/json?';

function buildUrl(lat, lon) {
  return `${baseUrl}&lat=${lat}&lng=${lon}&date=today`;
}

const getSunset = async function(lat, lon) {
  const url = buildUrl(lat, lon);

  return (await axios.get(url)).data.results.sunset;
};

module.exports = {
  getSunset
};
