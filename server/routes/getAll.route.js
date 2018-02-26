const Router = require('express');
const GetAllController = require('../controllers/getAllController');

const getAllRoute = new Router();

getAllRoute.post('/getAll', GetAllController.getAll);

module.exports = getAllRoute;