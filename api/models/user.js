
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    twitterId: { type: String, index: { unique: true }, lowercase: true, trim: true},
    recordingPath: String,
    name: String,
    nameClarification: String, 
    prefferedName: String,
    created_at: Date,
    updated_at: Date
});

// add created_at and updated_at before each save
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});


module.exports = mongoose.model('user', userSchema);
