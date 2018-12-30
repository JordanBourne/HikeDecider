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