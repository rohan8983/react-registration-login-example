var Directory = require('../models/directory');

exports.getAll = function (req, res) {
    var userId = req.body._id;
    Directory.find({ userId: userId }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.json({ result });
    });
}