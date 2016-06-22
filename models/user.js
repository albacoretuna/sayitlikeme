
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    twitterHandle: String,
    recordingAddress: String,
    name: String,
    nameClarification: String, 
    prefferedName: String,
    date: String,
    lastUpdated: String
});

module.exports = mongoose.model('user', userSchema);
