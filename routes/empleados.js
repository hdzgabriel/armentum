var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(request, response) {
	if (request.body && typeof request.body === 'object' && '_method' in request.body) {
		var method = request.body._method;
		delete request.body._method;
		return method;
	}
}));

var empleadoDao = mongoose.model ('Empleado');

router.route('/')
	.get(function(request, response, next) { //GET - Lista de Empleados
		empleadoDao.find({}, function(err, empleados) {
			if (err) {
				console.error('Error obteniendo la lista de empleados: ' + err);
				response.sendStatus(500);
			} else {
				response.format({
					json: function() {
						response.json(empleados);
					}
				});
			}
		});
	})
	.post(function(request, response, next){ //POST - Nuevo empleado
		var id = request.body.empleado_id;
		console.log('id: ' + id);
		var noEmpleado = request.body.no_empleado;
		console.log('noEmpleado: ' + noEmpleado);
		var apellidos = request.body.apellidos;
		console.log('apellidos: ' + apellidos);
		var nombres = request.body.nombres;
		console.log('nombres: ' + nombres);
		var categoria = request.body.categoria;
		console.log('categoria: ' + categoria);
		var extUser = request.body.ext_user;
		console.log('ext_user: ' + extUser);

		if ( id == null || nombres == null || apellidos == null ) {
			var err = new Error ();
			err.status = 400;
			next(err);
		}

		empleadoDao.create({
			_id: id,
			no_empleado: noEmpleado,
			apellidos: apellidos,
			nombres: nombres,
			categoria: categoria,
			ext_user: extUser
		}, function(err, empleado){
			if(err || empleado == null) {
				err = new Error ();
				err.status = 500;
				next(err);
			} else {
				response.status = 201;
				response.format({
					json: function() {
						response.json(empleado);
					}
				})
			}
		})
	})
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

router.param('id', function(request, response, next, id) {
	console.log('Buscando por ID: ' + id);
	request.id = id;
	next();
});

router.route('/:id')
	.get(function(request, response, next) { //GET - Obtiene un empleado por ID
		console.log('id: ' + request.id);
		empleadoDao.findById(request.id, function(err, empleado) {
			if (err || empleado == null) {
				console.error('Error obteniendo el empleado con id: ' + request.id);
				err = new Error ();
				err.status = 404;
				next(err);
			} else {
				response.format({
					json: function() {
						response.json(empleado);
					}
				});
			}
		});
	})
	.delete(function(request, response, next) { //Eliminar un empleado
		var id = request.id;
		if (id == null) {
			var err = new Error ();
			err.status = 400;
			next(err);
		}
		empleadoDao.remove({_id: id}, function (err) {
			if (err) {
				console.error('Error eliminando el empleado ' + id);
				console.error(err.stack);
				err = new Error ();
				err.status = 500;
				next(err);
			} else {
				response.status = 200;
				response.sendStatus(200);
			}
		})

	})
	.patch(function(request, response, next) { //Actualizar un empleado
		var id = request.id;
		console.log('id: ' + id);
		var noEmpleado = request.body.no_empleado;
		console.log('noEmpleado: ' + noEmpleado);
		var apellidos = request.body.apellidos;
		console.log('apellidos: ' + apellidos);
		var nombres = request.body.nombres;
		console.log('nombres: ' + nombres);
		var categoria = request.body.categoria;
		console.log('categoria: ' + categoria);
		var extUser = request.body.ext_user;
		console.log('ext_user: ' + extUser);

		if ( id == null ) {
			var err = new Error ();
			err.status = 400;
			next(err);
		}

		empleadoDao.findById(id, function(err, empleado) {
			if ( err || empleado == null ) {
				if (err) console.error (err.stack);
				err = new Error();
				err.status = 404;
				next(err);
			} else {
				if ( noEmpleado && noEmpleado.trim() != '' && !(no_empleado === empleado.no_empleado) ) empleado.no_empleado = noEmpleado;
				if ( apellidos && apellidos.trim() != '' && !(apellidos === empleado.apellidos) ) empleado.apellidos = apellidos;
				if ( nombres && nombres.trim() != '' && !(nombres === empleado.nombres) ) empleado.nombres = nombres;
				if ( categoria && categoria.trim() != '' && !(categria === empleado.categoria) ) empleado.categoria = categoria;
				if ( extUser && extUser.trim() != '' && !(extUser === empleado.ext_user) ) empleado.ext_user = extUser;

				empleado.save(function(err) {
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
			}
		});


	});

module.exports = router;
