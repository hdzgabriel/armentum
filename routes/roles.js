var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('../util/logger').child({routes: 'Roles'});

logger.info('Inicializando API REST - Roles');
logger.debug('bodyParser - urlencoded');
router.use(bodyParser.urlencoded({extended: true}));
logger.debug('methodOverride');
router.use(methodOverride(function(request, response) {
	if (request.body && typeof request.body === 'object' && '_method' in request.body) {
		var method = request.body._method;
		delete request.body._method;
		return method;
	}
}));

logger.debug ('Creando Mongoose Model');
var RolModel = mongoose.model ('Rol');
logger.info ('Mongoose Model Rol: ' + RolModel);
logger.info (RolModel);

var listaRoles = function (request, response, next) {
    logger.info('listaRoles');
	logger.debug('request: ' + request);
	logger.debug('response: ' + response);
	logger.info('Obteniendo lista de roles');
    RolModel.find({}, function (err, roles){
        if (err) {
            logger.error ('Error obteniendo lista de roles');
            logger.error(err);
            err.status = 500;
            next(err);
        } else {
            logger.debug('Lista obtenida');
            logger.debug(roles);
            response.format({
                json: function() {
                    response.json(roles);
                }
            });
        }
    });
};

router.route('/')
    .get(listaRoles);

module.exports = router;