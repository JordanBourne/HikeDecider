const Router = require('koa-router');

const router = new Router();

router.get('/getHikes', require('./routes/getHikes'));

module.exports = router;