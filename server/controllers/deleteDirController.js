var Directory = require('../models/directory');

exports.deleteDir = function (req, res) {
    var id = req.body.obj.id;
    Directory.deleteOne({ _id: id }, function (err, object) {
        if (err) {
            throw err;
        }
        var userId = req.body.obj.user._id;
        Directory.find({ userId }, function (err, result) {
            if (err) {
                throw err;
            }
            res.json({ result });
        })
    });
}