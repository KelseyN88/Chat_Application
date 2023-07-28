const router = require('express').Router()
const Room = require('../models/room.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT
const validateSession = require('../middleware/validate-session')



// Error Response function
const errorResponse = (res, error) => {
    return(
        res.status(500).json({
            error: error.message
        })
    )
}

//TODO POST - create
router.post('/', validateSession, async (req, res) => {
    try {
        
        //1. Pull data from our client (body)
        const { title, description, messages} = req.body;

        //2. Create a new object using the Model
        const room = new Room({
            title, description, messages,
            owner_id: req.user.id
        });

        //3. Use mongoose method to save to MongoDB (storing it)
        const newRoom = await room.save();

        //4. Client response
        res.status(200).json({
        newRoom,
        message: `${newRoom.title} added to collection!`
    })

    } catch (err) {
        errorResponse(res, err);
    }
});

//TODO GET One - read
router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const getRoom = await Room.findOne({_id: id});

        getRoom ?
            res.status(200).json({
                getRoom
            }) :
            res.status(404).json({
                message: `Whoopsie, No rooms found...`
            })
        
    } catch (err) {
        errorResponse(res, err)
    }
});



//TODO GET All - *** we dont need a validateSession on this one so everyone can view all rooms?***
router.get('/', async (req, res) => {
    try {
const getAllRooms = await Room.find()
        
        getAllRooms ?
        res.status(200).json({
            getAllRooms
        }) :
        res.status(404).json({
            message: `Whoopsie, no rooms found...`
        })

    } catch (err) {
        errorResponse(res, err);
        
    }
})


//TODO PATCH One - Make Updates
router.patch('/:id', validateSession, async (req, res) => {
    try {
        
        //1. Pull value from parameter
        const { id } = req.params;

        const filter = {_id: id, owner_id: req.user._id}

        //2. Pull data from the body
        const info = req.body;
        

        //3. Use method to locate document based off ID and pass in new info.
        const returnOption = {new: true};

       
        const updated = await Room.findOneAndUpdate(filter, info, returnOption);
        if(!updated) throw new Error('Room not owned by user')

        //4. Respond to client.
        res.status(200).json({
            message: `${updated.title} Updated!`,
            updated
        })

    } catch (err) {
        errorResponse(res, err)
    }
})


//TODO DELETE One - delete
router.delete('/:id', validateSession, async (req, res) => {
    try {
        //1. Capture ID
        const { id } = req.params;

        //2. Use delete method to locate and remove based off ID
        const deleteRoom = await Room.deleteOne({_id: id, owner_id: req.user._id});

        //3. Respond to client.
        deleteRoom.deletedCount ?
        res.status(200).json({
            message: `Room has been removed`
        }) :
        res.status(404).json({
            message: `No room in collection`
        })


    } catch (err) {
        errorResponse(res, err)
        
    }
})






module.exports = router;

