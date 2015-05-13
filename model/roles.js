var mongoose = require('mongoose');

var RolSchema = new mongoose.Schema({
    _id: Number,
    rol: String
});

mongoose.model('Rol', RolSchema, 'roles');