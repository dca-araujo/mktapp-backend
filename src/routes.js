const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const ClienteController = require('./controllers/ClienteController');
const EmpresaController = require('./controllers/EmpresaController');
const CupomController = require('./controllers/CupomController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post('/auth', UserController.auth);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.show);
routes.post('/cliente/busca', ClienteController.search);
routes.post('/cliente', ClienteController.store);
routes.put('/cliente/:id', ClienteController.update);
routes.delete('/cliente/:id', ClienteController.destroy);

routes.get('/empresa', EmpresaController.index);
routes.get('/empresa/:id', EmpresaController.show);
routes.post('/empresa', EmpresaController.store);
routes.put('/empresa/:id', EmpresaController.update);
routes.delete('/empresa/:id', EmpresaController.destroy);

routes.get('/cupom', CupomController.index);
routes.get('/cupom/:id', CupomController.show);
routes.post('/cupom', CupomController.store);
routes.put('/cupom/:id', CupomController.update);
routes.delete('/cupom/:id', CupomController.destroy);

module.exports = routes;
