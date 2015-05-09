var express = require('express');
var router = express.Router();
var logger = require('../util/logger').child({routes: '/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug('Redireccionando a /app/index.html');
  res.redirect('/app/index.html');
});

module.exports = router;
