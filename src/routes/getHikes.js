const hikeController = require('../controllers/hikeController');
const timeController = require('../controllers/timeController');

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
  const timeToHikePromise = timeController.getRemainingDaylight(lat, lon);

  const trails = await hikeController.getTrails({
    lat,
    lon,
    maxDistance,
    maxResults,
    minLength,
    rating
  });

  const detailedTrails = await hikeController.getTrailDistances({ lat, lon, trails, experience });

  const timeToHike = await Promise.resolve(timeToHikePromise).then(time => {
    return time > 0 ? time : Infinity;
  });
  const filteredTrails = hikeController.filterTrails({detailedTrails, timeToHike, maxLength, difficulty});

  return filteredTrails;
}

module.exports = { getHikes };