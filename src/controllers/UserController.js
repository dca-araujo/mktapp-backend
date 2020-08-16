const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
  async auth(req, res) {
    const user = await User.findOne({login: req.body.username}).select('+senha');

    if(!user)
      return res.json({error: true, msg: 'User not found'});

    if(!await bcrypt.compare(req.body.password, user.senha))
      return res.json({error: true, msg: 'Invalid password'});

    user.senha = undefined;

    const token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: 864000 });

    return res.json({user, token});
  },

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
