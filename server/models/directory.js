var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const DirectorySchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
});

module.exports = mongoose.model('directory', DirectorySchema);
