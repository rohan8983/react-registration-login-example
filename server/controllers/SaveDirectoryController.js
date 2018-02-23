var Directory = require('../models/directory');

exports.saveDirectory = function (req, res) {
    const data = req.body.formData;
    console.log(data);
    var newDirectory = new Directory(data);

    newDirectory.save((err, saved) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json({
                saved,
                status: true,
            });
            console.log("success");
        }
    })
}