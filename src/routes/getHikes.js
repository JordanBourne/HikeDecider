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
    maxTrailLength,
    rating,
    difficulty,
    experience
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
  const detailedTrails = await hikeController.getTrailDistances({ lat, lon, trails, experience });
  let timeToHike = await Promise.resolve(timeToHikePromise).then(hikingTime => {
    return hikingTime > 0 ? hikingTime : Infinity;
  });
  timeToHike = Math.min(preferredTime, timeToHike)
  const filteredTrails = hikeController.filterTrails({detailedTrails, timeToHike, maxTrailLength, difficulty});
  ctx.body = filteredTrails;

  return next();
}