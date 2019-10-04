const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    identificacion: Number,
    nombre: String,
    apellido: String,
    cargo: String,
    usuarioRed: String,
    apellido: String,
    estado: String,
    fechaRegistro: Number
});

module.exports = mongoose.model('collaborator', UserSchema);