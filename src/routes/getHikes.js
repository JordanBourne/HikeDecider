const hikingProjectService = require('../services/hikingProjectService');
const distanceService = require('../services/googleDirections');

const config = {
  hikeRates: {
    new: 1,
    beginner: 1.5,
    intermediate: 2,
    advanced: 3,
    expert: 4
  },
  ascentRates: {
    all: 4000
  },
  trailDifficulty: {
    green: 0,
    greenBlue: 1,
    blue: 2,
    blueBlack: 3,
    black: 4,
    dblack: 5
  }
};

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

  const trailResults = await hikingProjectService.get('getTrails', {
    lat,
    lon,
    maxDistance,
    maxResults,
    minLength,
    rating
  });

  const hikeRate = config.hikeRates[experience] || config.hikeRates.beginner;
  const trails = trailResults.trails;
  const start = { lat, lon };

  const detailedTrails = [];
  const unresolvedPromises = [];
  for (let trail of trails) {
    const end = {
    lat: trail.latitude,
    lon: trail.longitude
    }
    const distance = distanceService.getDistance(start, end);
    unresolvedPromises.push(distance);
  }

  await Promise.all(unresolvedPromises).then((distanceDetails) => {
    for (let i = 0; i < distanceDetails.length; i++) {
      detailedTrails.push({
        trail: trails[i],
        distanceDetails: distanceDetails[i],
        timeToHike: (trails[i].length / hikeRate + trails[i].ascent / config.ascentRates.all) * 3600
      });
    }
  });

  const timeToHike = timeOfSunset && currentTime ? timeOfSunset - currentTime : Infinity;
  const filteredTrails = filterTrails({detailedTrails, timeToHike, maxLength, difficulty});

  return filteredTrails;
}

const filterTrails = function({detailedTrails, timeToHike, maxLength = Infinity, difficulty = 5}) {
  const finalTrails = {
    doable: [],
    stretch: [],
    tooLong: []
  };

  for (let trail of detailedTrails) {
    const totalTime = trail.distanceDetails.routes[0].legs[0].duration.value + trail.timeToHike;
    const trailDifficulty = config.trailDifficulty[trail.trail.difficulty];
    let trailStatus = 0;

    // Adjust for time of trip
    if (timeToHike - totalTime < 0) {
      trailStatus++;
    }
    if (timeToHike - totalTime < -1800) {
      finalTrails.tooLong.push(trail);
      break;
    }

    // Adjust for length of hike
    if (trail.length > maxLength) {
      trailStatus++;
    }
    if (trail.length > maxLength * 1.25) {
      finalTrails.tooLong.push(trail);
      break;
    }

    // Adjust for difficulty
    if (difficulty - trailDifficulty > 0) {
      trailStatus += difficulty - trailDifficulty;
    }

    // Organize based on adjustments
    if (trailStatus === 0) {
      finalTrails.doable.push(trail);
    } else if (trailStatus <= 2) {
      finalTrails.stretch.push(trail);
    } else {
      finalTrails.tooLong.push(trail);
    }
  }

  return finalTrails;
};

module.exports = { getHikes };