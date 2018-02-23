var User = require('./models/user');
var bcrypt = require('bcrypt');

module.exports = function () {
    User.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        const firstName = "rohan";
        const lastName = "chougule";
        const username = "pl@gmail.com";
        const password = "123456";

        let hash = bcrypt.hashSync(password, 10);

        const objUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hash
        });
        User.create([objUser], (error) => {
            if (!error) {
                console.log("ready to go...");
            }
        });
    });
}