const Router = require('express');
const deleteDirController = require('../controllers/deleteDirController');

const deleteRoute = new Router();

deleteRoute.post('/delete', deleteDirController.deleteDir);

module.exports = deleteRoute;