var Directory = require('../models/directory');

exports.getAll = function (req, res) {
    Directory.find({}, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.json({ result });
    });
}