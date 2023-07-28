const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    
    date: {
        type: String, 
        required: true, 
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