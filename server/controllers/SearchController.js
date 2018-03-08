var Directory = require('../models/directory');

exports.searchDirectory = function (req, res) {
    var userId = req.body.userId;
    var value = req.body.formData.search;

    Directory.find({ userId: userId, name: new RegExp(value, "i") }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.json({ result });
    });
}