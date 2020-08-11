const Cupom = require('../models/Cupom');

module.exports = {
  async index(req, res) {
    const cupom = await Cupom.find().sort('-createdAt');
    return res.json(cupom);
  },

  async show(req, res) {
    const cupom = await Cupom.findById({_id: req.params.id})
    return res.json(cupom);
  },

  async destroy(req, res) {
    await Cupom.findByIdAndRemove({_id: req.params.id})
    return res.send();
  },

  async update(req, res) {
    const cupom = await Cupom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(cupom);
  },

  async store(req, res) {
    const cupom = await Cupom.create(req.body);
    return res.json(cupom);
  },
};
