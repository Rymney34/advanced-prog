const express = require('express');
const router = express.Router();
const {loginUser,createUser } = require('../controllers/userController');

const JWT = require('../security/auth/jwtTokenProvider');


// Get all users
// router.get('/users', getUsers);

// // Create a new user
// router.post('/users', createUser);

// Login user (without hashing passwords)
router.post('/register', createUser )
router.post('/login', loginUser);

router.get('/auth/validate', JWT.authenticateToken, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});
// router.get(
//     '/profile', 
//     JWT_Token_Provider.authenticateToken, // Middleware checks the token
//     (req, res) => {
//         // If the code reaches here, the token is valid, and req.user contains the payload
//         res.json({
//             message: 'Access granted to user profile!',
//             data: {
//                 // req.user comes from the decoded JWT payload
//                 userId: req.user.sub, 
//                 firstName: req.user.firstName,
//                 // You can fetch more data from the DB if needed using req.user.sub
//             }
//         });
//     }
// );





// router.post('/feedback', postFeedback);

module.exports = router;