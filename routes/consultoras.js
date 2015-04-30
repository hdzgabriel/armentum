var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true }));
router.use(methodOverride(function(request, response){
	if (request.body && typeof request.body === 'object' && '_method' in request.body) {
		var method = request.body._method
		delete req.body._method
		return method
	}
}))

router.route('/')
	//GET all 'consultoras'
	.get(function(request, response, next) {
		//retrieve all 'consultoras' from Mongo
		mongoose.model('Consultora').find({}, function (err, consultoras) {
			if (err) {
				return console.error(err);
			} else	{
				response.format({
					//HTML response in index.jade file in views/consultoras folder -- ONLY FOR TESTING
					html: function () {
						response.render ('consultoras/index', {
							title: 'Todas las consultoras',
							"consultoras" : consultoras
						});
					},
					json: function() {
						response.json(consultoras);
					}
				});
			}
		});
	})
	//POST a new 'consultora'
	.post(function(request, response) {
		//Get values from POST request. These can be done through forms or REST calls.
		//rely on the attributes for forms
		var nonmbre = request.body.nombre;
		//call the create function for database
		mongoose.model('Consultora').create({
			nombre: nombre,
		}, function (err, consultora) {
			if (err) {
				res.send("There was a problem adding the consultora to de database");
			} else {
				//'Consultora' has been created
				console.log('POST creating new Consultora: ' + consultora);
				response.format({
					//HTML response will set the location and redirecto back to the home page.
					html: function() {
						response.location("consultoras");
						response.redirect("/consultoras");
					},
					//JSON response will show the newly created blob
					json: function() {
						response.json(consultora);
					}
				});
			}
		})
	});
	
	router.get('/new', function(request, response) {
		res.render('consultoras/new', {title: 'Crea una nueva consultora'});
	});
	
	router.param('id', function(request, response, next, id) {
		console.log( 'Validating ' + id + ' exists');
		//find the ID in the database
		mongoose.model('Consultora').findById(id, function(err, consultora) {
			//id it isn't found, respond whit 404
			if (err) {
				console.log(id + ' was not found' );
				response.status(404);
				var error = new Error ('Not Found');
				error.estatus = 404;
				response.format({
					html: function() {
						next(error);
					},
					json: function() {
						response.json({message: error.status + ' ' + error});
					}
				});
				//if it is found
			} else {
				console.log(consultora);
				request.id = id;
				next();
			}
		});
	});
	
router.route('/:id')
	.get(function (request, response) {
		mongoose.model('Consultora').findById(request.id, function(err, consultora) {
			if (err) {
				console.log('GET error: there was a problem retriving ' + err);
			} else {
				console.log('GET Retrieving ID: ' + consultora._id);
				var nombre = consultora.nombre;
				response.format({
					html: function() {
						response.render('consultoras/show', {
							"nombre" : nombre
						});
					},
					json: function() {
						response.json(consultora);
					}
				});
			}
		});
	});
	
router.get('/:id/edit', function(request, response) {
	mongoose.model('Consultora').findById(request.id, function(err, consultora) {
		if (err) {
			console.log ('GET error: there was a problem retriving ' + err);
		} else {
			console.log('GET Retrieving ID: ' + consultora._id);
			var nombre = consultora.nombre;
			response.format({
				html: function() {
					response.render ('consultoras/edit', {
						title: 'Consultora ' + consultora._id,
						"nombre": consultora.nombre
					});
				},
				json: function() {
					response.json(consultora);
				}
			});
		}
	});
})
	
router.put('/:id/edit', function(request, response) {
	//get the values
	var nombre = request.body.nombre;
	
	//find the document by ID
	mongoose.model('Consultora').findById(request.id, function(err, consultora) {
		if (err) {
			return console.log( 'Error getting update element');
		} else {
			consultora.update({
				nombre: nombre
			}), function (err, consultoraId) {
				if (err) {
					res.send("There was a problem updating the information to the database: " + err);
				} else {
					response.format({
						html: function() {
							res.redirect("/consultoras/" + consultoraId);
						},
						json: function() {
							res.json(consultora);
						}
					});
				}
			}
		}
	});
});

router.delete('/:id/edit', function(request, response) {
	mongoose.model('Consultoras').findById(request.id, function (err, consultora) {
		if (err) {
			return console.error(err);
		} else {
			consultora.remove(function (err, consultora) {
				if (err) {
					return console.error(err);
				} else {
					console.log('DELETE removing ID: ' + consultora._id);
					res.format({
						html: function() {
							response.redirect('/consultoras');
						},
						json: function() {
							response.json({
								message: 'delete',
								item: consultora
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;