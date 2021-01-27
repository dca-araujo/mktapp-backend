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
        match: {
            validator: function(email) {
                const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return re.test(email);
            },
            message: props => 'burro'
        },
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
            message: props => 'The specified email address is already in use.'
        },        
        required: [true, "Email required"]
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