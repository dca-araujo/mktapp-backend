const mongoose = require('mongoose');
const ClienteSchema = new mongoose.Schema({
    nome: String,
    nascimento: Date,
    identidade: String,
    endereco: String,
    cidade: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Informe um e-mail válido'],
        validate: {
            validator: async function(email) {
                const user = await this.constructor.findOne({ email });
                if(user) {
                    if(this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'O e-mail informado já consta em nossa base de dados'
        },        
        required: [true, "Informe um e-mail"]
    },
    telefone: String,
    sexo: String,
    filhos: String,
    tarja: String,
    historico: String,
    state: String,
    senha: { type: String, required: true, select: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', ClienteSchema);