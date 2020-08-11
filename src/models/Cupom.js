const mongoose = require('mongoose');
const CupomSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    desconto: String,
    state: String,
    validade: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Cupom', CupomSchema);