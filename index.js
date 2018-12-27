const hikingProjectService = require('./src/services/hikingProjectService');
hikingProjectService.get('getTrails', {
  lat: 40.394390,
  lon: -105.070580
}).then(results => {
  console.log(results.trails);
});
