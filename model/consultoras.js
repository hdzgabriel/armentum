var mongoose = require('mongoose');
var consultoraSchema = new mongoose.Schema({
	_id: Number,
	nombre: String
});
mongoose.model('Consultora', consultoraSchema);