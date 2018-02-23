var loginUser = require('../models/user');
var bcrypt = require('bcrypt');

exports.loginUser = function (req, res) {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    loginUser.findOne({ username: req.body.username }, function (err, result) {
        if (err) {
            console.log("DB ERROR: " + err);
        }
        if (result == null) {

        } else {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                console.log("successfully login");
                let responseJson = {
                    token: 'fake-jwt-token'
                };
                res.json({ ok: true, json: () => responseJson });
            } else {
                ;
            }
        }
        return;
    });
}