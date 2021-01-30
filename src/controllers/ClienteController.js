const Cliente = require('../models/Cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
  async index(req, res) {
    const cliente = await Cliente.find().sort('-createdAt');
    return res.json(cliente);
  },

  async auth(req, res) {
    const user = await Cliente.findOne({email: req.body.email}).select('+senha');

    if(!user)
      return res.json({error: true, msg: 'Usuário inexistente'});

    if(!await bcrypt.compare(req.body.password, user.senha))
      return res.json({error: true, msg: 'Senha incorreta'});

    user.senha = undefined;

    const token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: 864000 });

    return res.json({user, token});
  },

  async search(req, res) {
    var conditions = {}; //declare a conditions object
    var and_clauses = []; //an array for the and conditions (and one for or conditions and so on)

    if(req.body.nome) // if the criteria has a value or values
      and_clauses.push({ nome: { $regex: new RegExp(req.body.nome), $options: 'i' }}); // add to the query object
      
    if(req.body.yearMin)
      and_clauses.push({ nascimento: { $gte : new Date(req.body.yearMin) }});

    if(req.body.yearMax)
      and_clauses.push({ nascimento: { $lte : new Date(req.body.yearMax) }});

    if(req.body.identidade)
      and_clauses.push({ identidade: { $regex: new RegExp(req.body.identidade), $options: 'i' }});

    if(req.body.endereco)
      and_clauses.push({ endereco: { $regex: new RegExp(req.body.endereco), $options: 'i' }});

    if(req.body.cidade)
      and_clauses.push({ cidade: { $regex: new RegExp(req.body.cidade), $options: 'i' }});

    if(req.body.email)
      and_clauses.push({ email: { $regex: new RegExp(req.body.email), $options: 'i' }});

    if(req.body.telefone)
      and_clauses.push({ telefone: { $regex: new RegExp(req.body.telefone), $options: 'i' }});

    if(req.body.sexo)
      and_clauses.push({ sexo: req.body.sexo });
      
    if(req.body.tarja)
      and_clauses.push({ tarja: req.body.tarja });
    
    if(req.body.filhos)
      and_clauses.push({ filhos: req.body.filhos });

    if(req.body.historico)
      and_clauses.push({ historico: { $regex: new RegExp(req.body.historico), $options: 'i' }});
      
    if(req.body.state)
      and_clauses.push({ state: req.body.state });
      
    if(and_clauses.length > 0)
        conditions['$and'] = and_clauses; // filter the search by any criteria given by the user

    const cliente = await Cliente.find(conditions);
    
    const chart = await Cliente.aggregate([{ $match:conditions },
      { $group: { _id:{sexo:"$sexo", ano:{"$year":"$nascimento"}}, count: { $sum: 1 } } },
      { $sort: {nascimento:1} }]);

    const widgets = await Cliente.aggregate([{ $match:conditions },
      { "$facet": {
          "filhos": [ {"$match" : {"filhos": "1"}}, {"$count": "total"} ],
          "masculino": [ {"$match" : {"sexo": "Masculino"}}, {"$count": "total"} ],
          "tarja": [ {"$match" : {"tarja": "1"}}, {"$count": "total"} ],
          "state": [ {"$match" : {"state": "1"}}, {"$count": "total"} ] 
      }},{ "$project": {
          "filhos": { "$arrayElemAt": ["$filhos.total", 0] },
          "masculino": { "$arrayElemAt": ["$masculino.total", 0] },
          "tarja": { "$arrayElemAt": ["$tarja.total", 0] },
          "state": { "$arrayElemAt": ["$state.total", 0] }
      }}
    ]);

    return res.json({cliente, widgets, chart});
  },

  async show(req, res) {
    const cliente = await Cliente.findById({_id: req.params.id})
    return res.json(cliente);
  },

  async destroy(req, res) {
    await Cliente.findByIdAndRemove({_id: req.params.id})
    return res.send();
  },

  async clean(req, res) {
      if(req.params.id == authConfig.key) {
        await Cliente.deleteMany({})
        return res.send();
      }
  },  

  async update(req, res) {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(cliente);
  },

  async store(req, res) {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.senha = bcrypt.hashSync(req.body.senha, salt);
        const cliente = await Cliente.create(req.body);
        const token = jwt.sign({ id: cliente._id }, authConfig.secret, { expiresIn: 864000 });
        return res.json({cliente, token });
    } catch (error) {
        return res.json(error);
    }
  },
};
