const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    // columns for out document
    title: {
        type: String, // What datatype this is expecting.
        required: true, // default is false
    },
    message: {
        type: String,
    },

});

module.exports = mongoose.model('Message', MessageSchema);