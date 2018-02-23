var Router = require('express');
var RegisterController = require('../controllers/RegisterController');
const registerRoute = new Router();

//registerRoute.route('/saveUser').post(RegisterController.registerUser);
registerRoute.post('/registerUser', RegisterController.regsiterUser);

module.exports = registerRoute;



