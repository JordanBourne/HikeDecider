const axios = require('axios');
const env = require('../../env');

//can get google directions using coordinates: https://developers.google.com/maps/documentation/directions/intro
const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json?'

const currentLocation = {
  lat: 40.394390,
  lon: -105.070580,
};

function buildUrl(start, end) {
  return `${baseUrl}origin=${start.lat},${start.lon}&destination=${end.lat},${end.lon}&key=${env.GOOGLE_API_KEY}`;
}

async function getDistance(start, end) {
  const url = buildUrl(start, end);

  return (axios.get(url)).data;
}

module.exports = { getDistance }

// https://maps.googleapis.com/maps/api/directions/json?origin=41.43206,-81.38992&destination=40.394390,-105.070580