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
        enum: ['admin', 'teacher', 'student', 'god'],
        default: 'student',
    },
    grades: {
        type: [String],
        default: ['Mat çok iyisin', 'Mat çok kötü', 'Türkçei yi'],
    }
});

const allowedRoles = ['admin', 'teacher', 'student', 'god'];

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
User.allowedRoles = allowedRoles;

module.exports = User;