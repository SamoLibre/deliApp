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
    profession: {
        type: String,
        required: function () {
            return this.role === 'teacher';
        },
        enum: ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Turkish', 'Geography', 'Philosophy', 'Psychology'],
    },
    class : {
        type: String,
        required: function () {
            return this.role === 'student';
        },
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);
