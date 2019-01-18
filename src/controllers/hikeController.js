const hikingProjectService = require('../services/hikingProjectService');
const distanceService = require('../services/googleDirections');

const config = require('../shared/config');

const getTrails = async function(params) {
  const availableTrails = await hikingProjectService.get('getTrails', params);
  return availableTrails.trails;
};

const filterTrails = function({trails, maxTrailLength}) {
  return trails.filter(trail => {
    return trail.length <= maxTrailLength; 
  });
};

const getTrailDistances = async function({ lat, lon, trails, experience }) {
  const start = { lat, lon };
  const unresolvedDistances = [];
  const hikeRate = config.hikeRates[experience] || config.hikeRates.beginner;
  for (let trail of trails) {
    const distance = _getTrailDistance({ trail, start});
    unresolvedDistances.push(distance);
  }

  const detailedTrails = await _getDetailedTrails({ unresolvedDistances, trails, hikeRate });
  return detailedTrails;
};

const _getTrailDistance = function({ trail, start}) {
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

const getDoableTrails = function({detailedTrails, timeToHike, difficulty = 5, ignoreTimeRestriction}) {
  const finalTrails = {
    doable: [],
    stretch: []
  };

  for (let trail of detailedTrails) {
    const totalTime = trail.distanceDetails.routes[0].legs[0].duration.value + trail.timeToHike;
    const trailDifficulty = config.trailDifficulty[trail.trail.difficulty];
    let trailStatus = 0;

    // Adjust for time of trip
    if (timeToHike - totalTime < 0 && !ignoreTimeRestriction) {
      trailStatus++;
    }
    if (timeToHike - totalTime < -1800 && !ignoreTimeRestriction) {
      continue;
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
    }
  }

  return finalTrails;
};

module.exports = {
  getTrails,
  getTrailDistances,
  getDoableTrails,
  filterTrails
}