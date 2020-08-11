const Cliente = require('../models/Cliente');

module.exports = {
  async index(req, res) {
    const cliente = await Cliente.find().sort('-createdAt');
    return res.json(cliente);
  },

  async show(req, res) {
    const cliente = await Cliente.findById({_id: req.params.id})
    return res.json(cliente);
  },

  async destroy(req, res) {
    await Cliente.findByIdAndRemove({_id: req.params.id})
    return res.send();
  },

  async update(req, res) {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(cliente);
  },

  async store(req, res) {
    const cliente = await Cliente.create(req.body);
    return res.json(cliente);
  },
};
