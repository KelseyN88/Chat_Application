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

//TODO POST - create new message ($push)
router.post('/', validateSession, async (req, res) => {
    try {
        
        //1. Pull data from our client (body)
        const { date, text, owner, room} = req.body;

        //2. Create a new object using the Model
        const message = new Message({
            date: new Date,
            text,
            owner,
            room,
            owner_id: req.user.id
        });

        //3. Use mongoose method to save to MongoDB (storing it)
        
        await message.save();

         // Update the 'messages' array of the corresponding room
         const roomToUpdate = await Room.findById(room);
         if (!roomToUpdate) {
             return res.status(404).json({ error: "Room not found." });
         }
        
        

         
         await Room.findOneAndUpdate(
            {_id: roomToUpdate},
            {$push: { messages: message} }
         )

     




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



//TODO PATCH One - Make Updates (findOneAndUpdate)
router.patch('/:id', validateSession, async (req, res) => {
    try {
        
        //1. Pull value from parameter
        const { id } = req.params;

        const filter = {_id: id, owner_id: req.user._id}

        //2. Pull data from the body
        const info = req.body;
        

        //3. Use method to locate document based off ID and pass in new info.
        const returnOption = {new: true};

       
        const updated = await Message.findOneAndUpdate(filter, info, returnOption);
        if(!updated) throw new Error('Message not owned by user')

        //4. Respond to client.
        res.status(200).json({
            message: `${updated.title} Updated!`,
            updated
        })

    } catch (err) {
        errorResponse(res, err)
    }
});



//TODO DELETE One - delete ($pull) in both places 

router.delete('/:id/:roomId', validateSession, async (req, res) => {
    try {
        //1. Capture ID
        const { id } = req.params;
        const { roomId } = req.params;
        

        //2. Use delete method to locate and remove based off ID
        const roomToUpdate = await Room.findById(id);
        const deleteMessage = await Message.deleteOne({_id: id, owner: req.user._id});

        const updatedMessages = await Message.find({ room: roomId });
        const returnOption = { new: true }

        const updatedRoom = await Room.findByIdAndUpdate(
            { _id: roomId }, // Find the room where the user is the owner
            
            { messages: updatedMessages },
            returnOption
        );

            

        

        //3. Respond to client.
        deleteMessage.deletedCount === 1 ?
            updatedRoom ? 
                res.status(200).json({
                    message: `Message has been removed, Room collection updated.`
                }) :
                res.status(404).json({
                    message: `Could not find room to update`
                })
            :
            res.status(404).json({
                message: `No message in collection, could not delete.`
            })


    } catch (err) {
        errorResponse(res, err)
        
    }
});







module.exports = router;

