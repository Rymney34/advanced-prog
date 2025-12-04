const express = require('express');
const router = express.Router();
const jwtTokenProvider = require ("../security/auth/jwtTokenProvider.js");

const {getAvailableTime, createBooking, getBooking} = require('../controllers/bookingController.js')

router.get('/available', getAvailableTime);
router.post('/createBooking', createBooking);
router.get(
  "/getBookings",
  jwtTokenProvider.authenticateToken, // <--- middleware here
  getBooking                      // <--- controller
);

module.exports = router;