require('dotenv').config() 
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000 
const log = console.log;








//MIDDLEWARE











//ROUTES












//Keep at bottom of file
app.listen(PORT, () => log(`Movie Server running on Port: ${PORT}`));