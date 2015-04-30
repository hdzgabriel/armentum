var mongoose = require ('mongoose');
var options = {
	user: 'gihernandez',
	pass: 'g1h3rn4nd3z'
}

mongoose.connect ('mongodb://localhost/rh', options);