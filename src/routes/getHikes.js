const hikeController = require('../controllers/hikeController');

const TIME_SERVICE = function() { return; };
const SUNSET_SERVICE = function() { return; };

const getHikes = async function({
  lat,
  lon,
  maxDistance,
  maxResults,
  time,
  minLength,
  maxLength,
  rating,
  difficulty,
  experience
}) {
  //https://timezonedb.com/references/get-time-zone
  //https://api.sunrise-sunset.org/json?lat=40.394390&lng=-105.070580&date=today
  const currentTime = TIME_SERVICE(lat, lon);
  const timeOfSunset = SUNSET_SERVICE(lat, lon);

  const trails = await hikeController.getTrails({
    lat,
    lon,
    maxDistance,
    maxResults,
    minLength,
    rating
  });

  const detailedTrails = await hikeController.getTrailDistances({ lat, lon, trails, experience });

  const timeToHike = timeOfSunset && currentTime ? timeOfSunset - currentTime : Infinity;
  const filteredTrails = hikeController.filterTrails({detailedTrails, timeToHike, maxLength, difficulty});

  return filteredTrails;
}

module.exports = { getHikes };