const express = require('express');
const router = express.Router();
const {loginUser,createUser } = require('../controllers/userController');

// Get all users
// router.get('/users', getUsers);

// // Create a new user
// router.post('/users', createUser);

// Login user (without hashing passwords)
router.post('/register', createUser )
router.post('/login', loginUser);




// router.post('/feedback', postFeedback);

module.exports = router;