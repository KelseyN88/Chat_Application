const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    // columns for out document
    title: {
        type: String, // What datatype this is expecting.
        required: true, // default is false
    },

});

module.exports = mongoose.model('Room', RoomSchema);