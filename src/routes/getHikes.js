const hikeController = require('../controllers/hikeController');
const timeController = require('../controllers/timeController');

module.exports = async (ctx, next) => {
  const {
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
  } = ctx.query;

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
  ctx.body = filteredTrails;
  console.log('## ctx.body ##', filteredTrails);
  return next();
}