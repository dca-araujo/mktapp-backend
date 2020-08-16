const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    login: String,
    email: { type: String, unique: true, required: true, lowercase: true }, 
    senha: { type: String, required: true, select: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);