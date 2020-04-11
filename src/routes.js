const express = require('express');
const routes = express.Router();
const IndexController = require('./controllers/IndexController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Rota index
routes.get('/', IndexController.index);

// Sessions
routes.post('/sessions', SessionController.create);

// Ongs
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.find);

// Incidentes
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.find);
routes.delete('/incidents/:id', IncidentController.destroy);

// Profile
routes.get('/profile', ProfileController.find);




module.exports = routes;