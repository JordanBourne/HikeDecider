const hikingProjectService = require('../services/hikingProjectService');
const distanceService = require('../services/googleDirections');

const config = require('../shared/config');

const getTrails = async function(params) {
  const availableTrails = await hikingProjectService.get('getTrails', params);

  return availableTrails.trails;
};

const getTrailDistances = async function({ lat, lon, trails, experience }) {
  const start = { lat, lon };
  const unresolvedDistances = [];
  const hikeRate = config.hikeRates[experience] || config.hikeRates.beginner;
  for (let trail of trails) {
    const distance = _getTrailDistance({ trail, start, lat, lon });
    unresolvedDistances.push(distance);
  }

  const detailedTrails = await _getDetailedTrails({ unresolvedDistances, trails, hikeRate });

  return detailedTrails;
};

const _getTrailDistance = function({ trail, start, lat, lon }) {
  const end = {
    lat: trail.latitude,
    lon: trail.longitude
  }
  return distanceService.getDistance(start, end);
};

const _getDetailedTrails = async function({ unresolvedDistances, trails, hikeRate }) {
  const detailedTrails = [];
  await Promise.all(unresolvedDistances).then((distanceDetails) => {
    for (let i = 0; i < distanceDetails.length; i++) {
      detailedTrails.push({
        trail: trails[i],
        distanceDetails: distanceDetails[i],
        timeToHike: (trails[i].length / hikeRate + trails[i].ascent / config.ascentRates.all) * 3600
      });
    }
  });

  return detailedTrails;
};

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
    if (trail.trail.length > maxLength) {
      trailStatus++;
    }
    if (trail.trail.length > maxLength * 1.25) {
      finalTrails.tooLong.push(trail);
      break;
    }

    // Adjust for difficulty
    if (trailDifficulty - difficulty > 0) {
      trailStatus += trailDifficulty - difficulty;
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

module.exports = {
  getTrails,
  getTrailDistances,
  filterTrails
}