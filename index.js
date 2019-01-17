const app = require('./app');
const config = require('./config/config');

console.log(`STARTING SERVER ON PORT ${config.port}`);
app.listen(config.port);