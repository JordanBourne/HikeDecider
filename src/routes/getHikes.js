const hikeController = require('../controllers/hikeController');
const timeController = require('../controllers/timeController');

module.exports = async (ctx, next) => {
  const {
    lat,
    lon,
    maxDistanceToTrail,
    maxResults = 10,
    preferredTime = Infinity,
    minTrailLength,
    maxTrailLength = Infinity,
    rating,
    difficulty,
    experience,
    ignoreTimeRestriction,
    startPoint = 0
  } = ctx.query;

  const timeToHikePromise = timeController.getRemainingDaylight(lat, lon);
  const trails = await hikeController.getTrails({
    lat,
    lon,
    maxDistanceToTrail,
    maxResults: parseInt(maxResults) + parseInt(startPoint),
    minTrailLength,
    rating
  });
  const filteredTrails = hikeController.filterTrails({trails, maxTrailLength, startPoint});
  const detailedTrails = await hikeController.getTrailDistances({ lat, lon, trails: filteredTrails, experience });
  let timeToHike = await Promise.resolve(timeToHikePromise).then(hikingTime => {
    return hikingTime > 0 ? hikingTime : Infinity;
  });
  timeToHike = Math.min(preferredTime, timeToHike)
  const doableTrails = hikeController.getDoableTrails({detailedTrails, timeToHike, difficulty, ignoreTimeRestriction});
  ctx.body = doableTrails;

  return next();
}