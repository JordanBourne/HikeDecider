const fs = require('fs');
const util = require('util');

const hikingProjectService = require('./src/services/hikingProjectService');
const distanceService = require('./src/services/googleDirections');

const writeFile = util.promisify(fs.writeFile);

async function getTrails(params) {
  const trails = (await hikingProjectService.get('getTrails', params)).trails;

  const distances = await getDistances(trails, params);

  return distances;
}

async function getDistances(trails, params) {
  return require('./distances');
  // const distances = [];
  // const start = {
  //   lat: params.lat,
  //   lon: params.lon
  // };
  
  // for (let trail of trails) {
  //   const end = {
  //     lat: trail.latitude,
  //     lon: trail.longitude
  //   }
  //   const distance = await distanceService.getDistance(start, end);
  //   distances.push(distance);
  // }

  // return distances;
}

async function saveDistances(distances) {
  return writeFile('distances.json', JSON.stringify(distances));
}

getTrails({
  lat: 40.394390,
  lon: -105.070580
}).then((results) => {
  console.log(results);
});