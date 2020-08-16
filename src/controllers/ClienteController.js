const Cliente = require('../models/Cliente');

module.exports = {
  async index(req, res) {
    const cliente = await Cliente.find().sort('-createdAt');
    return res.json(cliente);
  },

  async search(req, res) {
    const cliente = await Cliente.find().or([ {nome: req.body.nome ? { $regex: new RegExp(req.body.nome), $options: 'i' } : ''},
                                              {identidade: req.body.identidade ? { $regex: new RegExp(req.body.identidade), $options: 'i' } : ''},
                                              {nascimento: req.body.nascimento},
                                              {email: req.body.email ? { $regex: new RegExp(req.body.email), $options: 'i' } : ''},
                                              {telefone: req.body.telefone ? { $regex: new RegExp(req.body.telefone), $options: 'i' } : ''},
                                              {sexo: req.body.sexo},
                                              {endereco: req.body.endereco ? { $regex: new RegExp(req.body.endereco), $options: 'i' } : ''},
                                              {cidade: req.body.cidade ? { $regex: new RegExp(req.body.cidade), $options: 'i' } : ''},
                                              {historico: req.body.historico ? { $regex: new RegExp(req.body.historico), $options: 'i' } : ''},
                                              {tarja: req.body.tarja},
                                              {filhos: req.body.filhos},
                                              {state: req.body.state}]);
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
