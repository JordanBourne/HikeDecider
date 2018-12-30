const timezoneService = require('../services/timezoneService.js');
const sunsetService = require('../services/sunsetService.js');

const getTimezoneData = async function(lat, lon) {
  const timezoneData = await timezoneService.getTimezoneData(lat, lon);

  return timezoneData;
};

const getTimestampSeconds = async function(lat, lon) {
  const timezoneData = await getTimezoneData(lat, lon);

  return timezoneData.timestamp;
};

const getTimestampFormatted = async function(lat, lon) {
  const timezoneData = await getTimezoneData(lat, lon);

  return `${timezoneData.formatted.replace(' ', 'T')}.000Z`;
};

const getTimeOfSunset = async function(lat, lon) {
  const timeOfSunset = await sunsetService.getSunset(lat, lon);

  return timeOfSunset;
};

const getRemainingDaylight = async function(lat, lon) {
  return true;
};

module.exports = {
  getTimezoneData,
  getTimeOfSunset,
  getRemainingDaylight,
  getTimestampSeconds,
  getTimestampFormatted
};
