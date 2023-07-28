const router = require('express').Router()
const Message = require('../models/message.model')
const Room = require('../models/room.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT
const validateSession = require('../middleware/validate-session')
const mongoose = require('mongoose')

// Error Response function
const errorResponse = (res, error) => {
    return(
        res.status(500).json({
            error: error.message
        })
    )
}

//TODO POST - create new message
router.post('/', validateSession, async (req, res) => {
    try {
        
        //1. Pull data from our client (body)
        const { date, text, owner, room} = req.body;

        //2. Create a new object using the Model
        const message = new Message({
            date, text, owner, room,
            owner_id: req.user.id
        });

        //3. Use mongoose method to save to MongoDB (storing it)
        const newMessage = await message.save();

         // Update the 'messages' array of the corresponding room
         const roomToUpdate = await Room.findById(room);
         if (!roomToUpdate) {
             return res.status(404).json({ error: "Room not found." });
         }
 
         roomToUpdate.messages.push(newMessage);
         await roomToUpdate.save();

        //4. Client response
        res.status(200).json({
            
        message: `Your message has been posted!`
    })
   

    } catch (err) {
        errorResponse(res, err);
    }
});


// TODO GET All Messages
router.get('/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;

        // Check if the provided room ID is a valid ObjectId
        if (!mongoose.isValidObjectId(roomId)) {
            return res.status(400).json({
                message: "Invalid room ID format.",
            });
        }

        // Find all messages from the specified room
        const messages = await Message.find({ room: roomId });
        
        if (messages.length > 0) {
            res.status(200).json({
                messages: messages,
                
            });
            
        } else {
            res.status(404).json({
                message: "No messages found for the given room ID.",
            });
        }
    } catch (err) {
        errorResponse(res, err);
    }
});









module.exports = router;