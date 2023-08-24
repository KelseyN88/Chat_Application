require('dotenv').config() 
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000 
const log = console.log;

const user = require('./controllers/user.controller')
const room = require('./controllers/room.controller')
const message = require('./controllers/message.controller')

const mongoose = require('mongoose') // used from node_modules
const MONGO = process.env.MONGO // connection variable from .env

const cors = require('cors');




//MIDDLEWARE
mongoose.connect(`${MONGO}/ChatApp`)
const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));



//ROUTES
app.use(express.json())
app.use(cors())
app.use('/user', user)
app.use('/room', room)
app.use('/message', message)











//Keep at bottom of file
app.listen(PORT, () => log(`Chat Server is running on Port: ${PORT}`));