var Router = require('express');
var UpdateDirController = require('../controllers/updateDirController');
const UpdateDirRoute = new Router();

UpdateDirRoute.post('/update', UpdateDirController.updateDir);

module.exports = UpdateDirRoute;



