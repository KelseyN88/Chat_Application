const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    // columns for out document
    title: {
        type: String, // What datatype this is expecting.
        required: true,
        unique: true, // default is false
    },
    description: {
        type: String, // What datatype this is expecting.
        required: false, // default is false
    },
    messages: {
        type: Array, // What datatype this is expecting.
        
    },
    ownerId: {
        type: String, // What datatype this is expecting.
    },

});

module.exports = mongoose.model('Room', RoomSchema);