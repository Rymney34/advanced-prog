const express = require('express');
const userRoutes = require("./routes/userRoutes.js");
const path = require('path');
const User = require("./schemas/user");
const cors = require("cors");
const connectDB = require('./config/dbConnect');
// Connect to MongoDB Databases

const PORT = process.env.PORT ||3001
const app = express()
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors());
console.log("llgin")

app.use('/api', userRoutes)
app.use('/api', userRoutes)


app.listen (PORT, () => {
    console. log('Server starting on port')

})


app.get('/api', (req, res) => {
    res.json(
        {message: "Hello from backendkjhgsdfjklhvb sdnfjklxcgb express.js"

        }
    )
})

