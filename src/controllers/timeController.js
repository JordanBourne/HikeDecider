const timezoneService = require('../services/timezoneService.js');
const sunsetService = require('../services/sunsetService.js');

const calculateSecondsFromTimestamp = function(timestamp) {
  // format must be hh:mm:ss
  const hourMinSecond = timestamp.split(':');

  return hourMinSecond[0] * 3600 + hourMinSecond[1] * 60 + Number(hourMinSecond[2]);
}

const getSecondsPassedToday = function(timezoneData) {
  const currentClockTime = timezoneData.formatted.split(' ');

  return calculateSecondsFromTimestamp(currentClockTime[1]);
};

const getSecondsUntilSunset = function(sunsetTime, gmtOffset) {
  const sunset = sunsetTime.split(' ');
  const halfDay = 60 * 60 * 12;
  const fullDay = 60 * 60 * 24;
  let sunsetSeconds = calculateSecondsFromTimestamp(sunset[0]);

  if (sunset[1] === 'PM') {
    sunsetSeconds += halfDay;
  }

  if (sunset[0].indexOf('12') === 0) {
    sunsetSeconds -= halfDay;
  }

  sunsetSeconds += gmtOffset;

  if (sunsetSeconds < 0) {
    sunsetSeconds += fullDay;
  }

  if (sunsetSeconds > fullDay) {
    sunsetSeconds -= fullDay;
  }

  return sunsetSeconds;
};

const getRemainingDaylight = async function(lat, lon) {
  const timezoneData = timezoneService.getTimezoneData(lat, lon);
  const sunsetTime = sunsetService.getSunset(lat, lon);
  let secondsPassedToday;
  let sunsetTimeInSeconds;

  await Promise.all([timezoneData, sunsetTime]).then(responses => {
    secondsPassedToday = getSecondsPassedToday(responses[0]);
    sunsetTimeInSeconds = getSecondsUntilSunset(responses[1], responses[0].gmtOffset);
  });

  return sunsetTimeInSeconds - secondsPassedToday;
};

module.exports = {
  getSecondsPassedToday,
  getSecondsUntilSunset,
  getRemainingDaylight
};
