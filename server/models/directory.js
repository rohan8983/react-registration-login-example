var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const DirectorySchema = new Schema({
    address: { type: String, required: true },
    mobile: { type: String, required: true },
});

module.exports = mongoose.model('directory', DirectorySchema);
