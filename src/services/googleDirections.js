const axios = require('axios');
const env = require('../../env');

const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json?';


const currentLocation = {
  lat: 40.394390,
  lon: -105.070580,
};

function buildUrl(start, end) {
  return `${baseUrl}origin=${start.lat},${start.lon}&destination=${end.lat},${end.lon}&key=${env.GOOGLE_API_KEY}`;
}

function distanceCleanup(distance) {
  distance.data.routes.forEach(route => {
    delete route.overview_polyline;
    route.legs.forEach(leg => {
      delete leg.steps;
    });
  });

  return distance.data;
}

async function getDistance(start, end) {
  const url = buildUrl(start, end);
  const distance = await axios.get(url);

  return distanceCleanup(distance);
}

module.exports = { getDistance };
