var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('../util/logger').child({routes: 'Empleados'});

logger.info ('Inicializando REST API');
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

logger.debug ('Creando Mongoose Model')
var empleadoDao = mongoose.model ('Empleado');
logger.info ('Mongoose Model Empleado: ' + empleadoDao);

var listaEmpleados = function (request, response, next) {
	logger.info('getAllEmpleados');
	logger.debug('request: ' + request);
	logger.debug('response: ' + response);
	logger.info('Obteniendo lista de empleados');
	empleadoDao.find({}, function(err, empleados) {
		if (err) {
			logger.error('Error al obtener la lista de empleados: ' + err);
			response.sendStatus(500);
		} else {
			logger.debug('Lista de empleados obtenida');
			response.format({
				json: function() {
					response.json(empleados);
				}
			});
		}
	});
}

var crearEmpleado = function(request, response, next) {
	logger.info('crearEmpleado');
	logger.debug('Obteniendo elementos del request');
	logger.debug(request.body);
	var id = request.body.empleado_id;
	logger.debug('id: ' + id);
	var noEmpleado = request.body.no_empleado;
	logger.debug('noEmpleado: ' + noEmpleado);
	var apellidos = request.body.apellidos;
	logger.debug('apellidos: ' + apellidos);
	var nombres = request.body.nombres;
	logger.debug('nombres: ' + nombres);
	var categoria = request.body.categoria;
	logger.debug('categoria: ' + categoria);
	var extUser = request.body.ext_user;
	logger.debug('ext_user: ' + extUser);

	if ( id == null || nombres == null || apellidos == null ) {
		logger.info('Valores minimos para la creacion nulos');
		var err = new Error ();
		err.status = 400;
		logger.debug('Enviando 400 - \'Solicitud Incorrecta\'');
		next(err);
	}

	logger.info('Creando empleado: ' + id);
	empleadoDao.create({
		_id: id,
		no_empleado: noEmpleado,
		apellidos: apellidos,
		nombres: nombres,
		categoria: categoria,
		ext_user: extUser
	}, function(err, empleado){
		if(err || empleado == null) {
			logger.error('Error creando el empleado ' + id, err);
			err = new Error ();
			err.status = 500;
			logger.debug('Enviando 500 - \'Error Interno\'');
			next(err);
		} else {
			logger.info('Empleado ' + id + ' creado: ' + empleado);
			response.status = 201;
			response.format({
				json: function() {
					response.json(empleado);
				}
			})
		}
	})
}

var obtieneEmpleadoPorId = function (request, response, next) {
	logger.info('id: ' + request.id);
	empleadoDao.findById(request.id, function(err, empleado) {
		if (err) {
			logger.error('Error obteniendo el empleado con id: ' + request.id);
			err.status = 500;
			next(err);
		} else {
			if (empleado) {
				logger.info('Empleado ' + request.id + ' encontrado: ' + empleado);
				response.format({
					json: function() {
						response.json(empleado);
					}
				});
			} else {
				err = new Error ();
				logger.debug('Enviando 404 - \'No Encontrado\'');
				err.status = 404;
				next(err);
			}
		}
	});
}

var borrarEmpleado = function (request, response, next) {
	var id = request.id;
	logger.debug('Eliminar Empleado: ' + id);
	if (id == null) {
		logger.debug('Solicitud de eliminacion erronea');
		var err = new Error ();
		err.status = 400;
		logger.debug('Enviando 400 - \'Solicitud Incorrecta\'');
		next(err);
	}
	empleadoDao.remove({_id: id}, function (err) {
		if (err) {
			logger.error('Error eliminando el empleado ' + id);
			err = new Error ();
			err.status = 500;
			logger.debug('Enviando 500 - \'Error Interno\'');
			next(err);
		} else {
			logger.warn ('Empleado ' + id + ' eliminado');
			response.status = 200;
			response.sendStatus(200);
		}
	});
}

var actualizaEmpleado = function (request, response, next) {
	logger.debug('Actualizar empleado ' + request.id);
	var id = request.id;
	logger.debug('id: ' + id);
	var noEmpleado = request.body.no_empleado;
	logger.debug('noEmpleado: ' + noEmpleado);
	var apellidos = request.body.apellidos;
	logger.debug('apellidos: ' + apellidos);
	var nombres = request.body.nombres;
	logger.debug('nombres: ' + nombres);
	var categoria = request.body.categoria;
	logger.debug('categoria: ' + categoria);
	var extUser = request.body.ext_user;
	logger.debug('ext_user: ' + extUser);

	if ( id == null ) {
		logger.debug('Solicitud de eliminacion erronea');
		var err = new Error ();
		err.status = 400;
		logger.debug('Enviando 400 - \'Solicitud Incorrecta\'');
		next(err);
	}

	empleadoDao.findById(id, function(err, empleado) {
		if (err) {
			logger.error('Error obteniendo el empleado con id: ' + request.id);
			if (err) console.error (err.stack);
			err = new Error();
			err.status = 500;
			logger.debug('Enviando 500 - \'Error Interno\'');
			next(err);
		} else {
			if (empleado) {
				logger.info('Elemento original: ' + empleado);
				if ( noEmpleado && noEmpleado.trim() != '' && !(no_empleado === empleado.no_empleado) ) empleado.no_empleado = noEmpleado;
				if ( apellidos && apellidos.trim() != '' && !(apellidos === empleado.apellidos) ) empleado.apellidos = apellidos;
				if ( nombres && nombres.trim() != '' && !(nombres === empleado.nombres) ) empleado.nombres = nombres;
				if ( categoria && categoria.trim() != '' && !(categria === empleado.categoria) ) empleado.categoria = categoria;
				if ( extUser && extUser.trim() != '' && !(extUser === empleado.ext_user) ) empleado.ext_user = extUser;
				logger.info('Elemento modificado: ' + empleado);
				empleado.save(function(err) {
					logger.info('Actualizando empleado ' + id);
					if (err) {

						err.status = 500;
						next(err);
					} else {
						response.status (200);
						response.format({
							json:function () {
								response.json(empleado);
							}
						})
					}
				});
			} else {
				logger.debug('Empleado ' + id + ' no encontrado');
				var err = new Error();
				logger.debug('Enviando 404 - \'No Encontrado\'');
				err.status = 404;
				next(err);
			}
		}
	});
}

router.param('id', function(request, response, next, id) {
	logger.debug('Buscando por parametro ID: ' + id);
	request.id = id;
	next();
});

router.route('/')
	.get(listaEmpleados) //GET - Lista de empleados
	.post(crearEmpleado) //POST - Crea un nuevo empleado
	.put(function(request, response, next) {
		var err = new Error ();
		err.status = 405;
		next(err);
	})
	.delete(function(request, response, next) {
		var err = new Error ();
		err.status = 405;
		next(err);
	});

router.route('/:id')
	.get(obtieneEmpleadoPorId) //GET - Obtiene un empleado por ID
	.delete(borrarEmpleado) //DELETE - Elimina un empleado por ID
	.patch(actualizaEmpleado); //PATCH - Actualiza un empleado por ID

module.exports = router;
