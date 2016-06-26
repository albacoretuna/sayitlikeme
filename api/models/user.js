
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    twitterId: { type: String, index: { unique: true }, lowercase: true, trim: true},
    recordingPath: String,
    name: String,
    nameClarification: String, 
    prefferedName: String,
    updated_at: Date
});

// add created_at and updated_at before each save
userSchema.pre('findOneAndUpdate', function(next) {
    // get the current date
    const currentDate = new Date();

    // change the updated_at field to current date
    this.findOneAndUpdate({}, { updated_at: currentDate });
    console.log(this);

    next();
});

module.exports = mongoose.model('user', userSchema);
