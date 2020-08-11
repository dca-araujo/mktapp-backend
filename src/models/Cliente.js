const mongoose = require('mongoose');
const ClienteSchema = new mongoose.Schema({
    nome: String,
    nascimento: Date,
    identidade: String,
    endereco: String,
    cidade: String,
    email: String,
    telefone: String,
    sexo: String,
    filhos: String,
    tarja: String,
    historico: String,
    state: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', ClienteSchema);