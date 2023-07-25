const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    // columns for out document
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false, 
    },
    messages: {
        type: Array,
        
    },
    ownerId: {
        type: String,
    },

});

module.exports = mongoose.model('Room', RoomSchema);