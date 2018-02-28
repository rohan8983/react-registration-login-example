var Directory = require('../models/directory');

exports.updateDir = function (req, res) {
    var data = req.body.data;
    var myquery = { _id: data._id };
    var newvalues = { $set: { name: data.name, mobile: data.mobile } };
    Directory.updateOne(myquery, newvalues, function (err, obj) {
        if (err) throw err;
        Directory.find({ userId: req.body.userId }, function (err, result) {
            if (err) {
                throw err;
            }
            res.json({ result });
        });
    });
}