var loginUser = require('../models/user');
var bcrypt = require('bcrypt');

exports.loginUser = function (req, res) {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    loginUser.findOne({ username: req.body.username }, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result !== null && bcrypt.compareSync(req.body.password, result.password)) {
            res.json({ ok: true, result });
        } else {
            //res.sendStatus(404);
        }
    });

}