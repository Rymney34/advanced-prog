const express = require('express');
const router = express.Router();
const {loginUser,createUser } = require('../controllers/userController');
const { validate, refreshFunc, logout } = require("../controllers/authController");
const JWT = require('../security/auth/jwtTokenProvider');


// Get all users
// router.get('/users', getUsers);

// // Create a new user
// router.post('/users', createUser);

// Login user (without hashing passwords)
router.post('/register', createUser )
router.post('/login', loginUser);

router.get('/auth/validate', validate);

router.post('/refresh', refreshFunc );

router.post('/logout', logout );





module.exports = router;