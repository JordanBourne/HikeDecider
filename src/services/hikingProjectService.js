const axios = require('axios');
const env = require('../../env');

const baseUrl = 'https://www.hikingproject.com/data/';
const apiMethods = {
  getTrails: {
    url: 'get-trails',
    requiredParams: ['lat', 'lon', 'key'],
    optionalParams: ['maxDistance', 'maxResults', 'sort', 'minLength', 'minStars']
  },
  getTrailsById: {
    url: 'get-trails-by-id',
    requiredParams: ['ids', 'key'],
    optionalParams: []
  },
  getConditions: {
    url: 'get-conditions',
    requiredParams: ['ids'],
    optionalParams: []
  },
  getToDos: {
    url: 'get-to-dos',
    requiredParams: ['userId', 'email', 'key'],
    optionalParams: ['startPos']
  }
};

function buildUrl(method, params) {
  let url = `${baseUrl}${apiMethods[method].url}?`;
  for (let arg in params) {
    if (apiMethods[method].requiredParams.includes(arg) || apiMethods[method].optionalParams.includes(arg)) {
      url += `${arg}=${params[arg]}&`;
    }
  }

  return url + `key=${env.HIKING_PROJECT_API_KEY}`;
}

async function get(method, params) {
  const url = buildUrl(method, params);
  
  return (await axios.get(url)).data;
}

module.exports = { get };
