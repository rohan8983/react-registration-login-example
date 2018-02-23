var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const UserSchema = new Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true }
});

module.exports = mongoose.model('user', UserSchema);
