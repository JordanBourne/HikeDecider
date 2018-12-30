const axios = require('axios');
const env = require('../../env');

const baseUrl = 'http://api.timezonedb.com/v2.1/get-time-zone?';

function buildUrl(lat, lon) {
  return `${baseUrl}key=${env.TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;
}

const getTimezoneData = async function(lat, lon) {
  const url = buildUrl(lat, lon);

  return (await axios.get(url)).data;
};

module.exports = {
  getTimezoneData,
};
