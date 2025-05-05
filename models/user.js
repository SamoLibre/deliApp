const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher', 'god'],
        default: 'student',
    },
    grades: {
        type: [String],
        default: ['Mat çok iyisin', 'Mat çok kötü', 'Türkçei yi'],
    }
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);
