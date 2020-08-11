const mongoose = require('mongoose');
const EmpresaSchema = new mongoose.Schema({
    descricao: String,
    endereco: String,
    atendimento: String,
    email: String,
    telefone: String,
    whatsapp: String,
    telefone: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Empresa', EmpresaSchema);