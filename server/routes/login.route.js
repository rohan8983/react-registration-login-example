const Router = require('express');
const LoginController = require('../controllers/LoginController');

const loginRoute = new Router();

loginRoute.post('/login', LoginController.loginUser);

module.exports = loginRoute;