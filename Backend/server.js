const express = require('express');
const jwt = require('jsonwebtoken')
const userRoutes = require("./routes/userRoutes.js");
const path = require('path');
const User = require("./schemas/user");
const cors = require("cors");
// const connectDB = require('./config/dbConnect');
// Connect to MongoDB Databases
const db = require('./config/dbConnect'); 

const JWT_Token = process.env.ACCESS_TOKEN_SECRET
const REFRESH_Token = process.env.REFRESH_TOKEN
const ACCESS_Token_Expires = '30s'
// const REFRESH_Token_Expires = '2d'

const JWT = require('../Backend/security/auth/jwtTokenProvider.js');

const PORT = process.env.PORT || 3001
const app = express()
// connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors());
console.log("llgin")

app.use('/api', userRoutes)
app.use('/api', userRoutes)
// app.use('/', userRoutes)
// app.use('/auth/validate', userRoutes)

// app.get('/auth/validate', JWT.authenticateToken, (req, res) => {
//     res.status(200).json({ valid: true, user: req.user });
// });


app.get('/api/token', (req, res) => {
     const secret = "gazoz"
        const payload = {
            id: "gazpz",
            name:"gazozik"
        }
        const token = jwt.sign(payload, JWT_Token,{
            expiresIn:ACCESS_Token_Expires
        })
        res.status(200).json({
            token
        })
    });

app.get('/api/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // ← use the same secret!
        res.status(200).json({ data: decoded });
    } catch (error) {
        res.status(401).json({ 
            message: "Token invalid or expired",
            error: error.message 
        });
    }
});

app.listen (PORT, () => {
    console. log('Server starting on port')

})


app.get('/api', (req, res) => {
    res.json(
        {message: "Hello from backendkjhgsdfjklhvb sdnfjklxcgb express.js"

        }
    )
})

