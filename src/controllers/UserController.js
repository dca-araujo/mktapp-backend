const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const user = await User.find().sort('-createdAt');
    return res.json(user);
  },

  async show(req, res) {
    const user = await User.findById({_id: req.params.id})
    return res.json(user);
  },

  async destroy(req, res) {
    await User.findByIdAndRemove({_id: req.params.id})
    return res.send();
  },

  async update(req, res) {
    const {
      login, senha,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    const user = await User.findByIdAndUpdate(req.params.id, { login, senha: hash }, { new: true });

    return res.json(user);
  },

  async store(req, res) {
    const {
      login, senha,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    const user = await User.create({
      login,
      senha: hash,
    });

    return res.json(user);
  },
};
