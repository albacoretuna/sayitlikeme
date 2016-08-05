const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    twitterId: { type: String, index: { unique: true }, lowercase: true, trim: true},
    name: String,
    nameClarification: String,
    hasAudio: Boolean,
    notes: String,
    updated_at: Date
});
// userSchema.path('name').validate((v) => v.length < 2, 'notes is too long');
// userSchema.path('nameClarification').validate((v) => v.length < 2, 'Nameclarification is too long');
// userSchema.path('notes').validate((v) => v.length < 4, 'notes is too long');
// add created_at and updated_at before each save
userSchema.pre('findOneAndUpdate', function(next) {
    // get the current date
    const currentDate = new Date();

    // change the updated_at field to current date
    this.findOneAndUpdate({}, { updated_at: currentDate });

    next();
});

module.exports = mongoose.model('user', userSchema);
