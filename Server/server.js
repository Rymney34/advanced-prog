const express = require('express');
const userRoutes = require("./routes/userRoutes.js");
const path = require('path');
const User = require("./schemas/user");

require("./config/dbConnect.js"); // Connect to MongoDB Databases

const PORT = process.env.PORT ||3001
const app = express()
app.use(express.json())

console.log("llgin")
app.use('/login',userRoutes)


app.listen (PORT, () => {
    console. log('Server starting on port')

})


app.get('/api', (req, res) => {
    res.json(
        {message: "Hello from backendkjhgsdfjklhvb sdnfjklxcgb express.js"

        }
    )
})

