var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = new express();
var mongoose = require('mongoose');

var serverConfig = require('./config');
var defaultUser = require('./defaultUser.js');

var registerRoute = require('./routes/register.route');
var loginRoute = require('./routes/login.route');
var SaveDirectoryRoute = require('./routes/saveDirectory.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Use bluebird
mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        console.error('please make sure mongodb is installed');
        throw error;
    }
    defaultUser();
});

app.post('/registerUser', bodyParser.json({}), bodyParser.urlencoded({ extended: true }), registerRoute);
app.post('/login', bodyParser.json({}), bodyParser.urlencoded({ extended: true }), loginRoute);
app.post('/register_dir', bodyParser.json({}), bodyParser.urlencoded({ extended: true }), SaveDirectoryRoute);

//start app
app.listen(serverConfig.port, function (error) {
    if (!error) {
        console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`);
    }

});
