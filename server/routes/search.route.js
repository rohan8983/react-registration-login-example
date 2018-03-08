var Router = require('express');
var SearchController = require('../controllers/SearchController');
const SearchRoute = new Router();

SearchRoute.post('/search', SearchController.searchDirectory);

module.exports = SearchRoute;



