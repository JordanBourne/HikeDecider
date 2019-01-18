const hikeController = require('../controllers/hikeController');
const timeController = require('../controllers/timeController');

module.exports = async (ctx, next) => {
  const {
    lat,
    lon,
    maxDistanceToTrail,
    maxResults,
    preferredTime = Infinity,
    minTrailLength,
    maxTrailLength = Infinity,
    rating,
    difficulty,
    experience,
    ignoreTimeRestriction
  } = ctx.query;

  const timeToHikePromise = timeController.getRemainingDaylight(lat, lon);
  const trails = await hikeController.getTrails({
    lat,
    lon,
    maxDistanceToTrail,
    maxResults,
    minTrailLength,
    rating
  });
  const filteredTrails = hikeController.filterTrails({trails, maxTrailLength});
  const detailedTrails = await hikeController.getTrailDistances({ lat, lon, trails: filteredTrails, experience });
  let timeToHike = await Promise.resolve(timeToHikePromise).then(hikingTime => {
    return hikingTime > 0 ? hikingTime : Infinity;
  });
  timeToHike = Math.min(preferredTime, timeToHike)
  const doableTrails = hikeController.getDoableTrails({detailedTrails, timeToHike, difficulty, ignoreTimeRestriction});
  ctx.body = doableTrails;

  return next();
}