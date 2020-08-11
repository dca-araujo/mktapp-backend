const Empresa = require('../models/Empresa');

module.exports = {
  async index(req, res) {
    const empresa = await Empresa.find().sort('-createdAt');
    return res.json(empresa);
  },

  async show(req, res) {
    const empresa = await Empresa.findById({_id: req.params.id})
    return res.json(empresa);
  },

  async destroy(req, res) {
    await Empresa.findByIdAndRemove({_id: req.params.id})
    return res.send();
  },

  async update(req, res) {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(empresa);
  },

  async store(req, res) {
    const empresa = await Empresa.create(req.body);
    return res.json(empresa);
  },
};
