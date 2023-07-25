const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    // columns for out document
    date: {
        type: String, // What datatype this is expecting.
        required: true, // default is false
    },
    text: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
    },
    room: {
        type: String,
    },

});

module.exports = mongoose.model('Message', MessageSchema);