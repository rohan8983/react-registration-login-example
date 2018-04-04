var User = require('../models/user');
var bcrypt = require('bcrypt');

exports.regsiterUser = function (req, res) {
    const data = req.body.user;
    //before registeration checking duplicate users in database 
    User.findOne({ username: req.body.user.username }, function (err, newuser) {
        if (err) {
            console.log("DB ERROR: " + err);
        }
        //storing unique users in data-base
        if (newuser == null) {
            let hash = bcrypt.hashSync(req.body.user.password, 10);
            var userData = {
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                username: req.body.user.username,
                password: hash
            }
            const newUser = new User(userData);
            newUser.save((err, saved) => {
                if (err) {
                    res.status(500).send(err);
                    console.log("Error while storing data into database: " + err);
                } else {
                    res.json({
                        user: saved,
                        status: true
                    });
                }
            });
        } else {
            console.log("UserName " + newuser.username + " is already taken");
            res.json({
                username: newuser.username,
                status: false
            });
        }
    })
}


