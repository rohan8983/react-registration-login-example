var Router = require('express');
var SaveDirectoryController = require('../controllers/SaveDirectoryController');
const SaveDirectoryRoute = new Router();

SaveDirectoryRoute.post('/register_dir', SaveDirectoryController.saveDirectory);

module.exports = SaveDirectoryRoute;



