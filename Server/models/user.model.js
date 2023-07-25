const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // columns for out document
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true // duplicate emails will throw an error message
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);