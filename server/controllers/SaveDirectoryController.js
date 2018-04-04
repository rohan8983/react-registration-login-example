var Directory = require('../models/directory');

exports.saveDirectory = function (req, res) {
    const data = {
        userId: req.body._id,
        name: req.body.formData.name,
        mobile: req.body.formData.mobile,
    }
    var newDirectory = new Directory(data);

    newDirectory.save((err, saved) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            Directory.find({ userId: saved.userId }, function (err, result) {
                res.json({
                    result,
                    status: true,
                });
            });
        }
    });
}