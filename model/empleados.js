var mongoose = require('mongoose');

var empleadoSchema = new mongoose.Schema({
	_id: String,
	no_empleado: String,
	apellidos: String,
	nombres: String,
	categoria: String,
	ext_user: String,
	contratacion: [{contratacion_id: Number, activo: Boolean}],
	equipodesa: [{equipodesa_id: Number, asignado: Date, activo: Boolean}],
	rol: [{rol_id: Number, rol_nivel: Number, asignado: Date}]
});

mongoose.model('Empleado', empleadoSchema);