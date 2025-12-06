const express = require('express');
const router = express.Router();
const jwtTokenProvider = require ("../security/auth/jwtTokenProvider.js");

const {getAvailableTime, searchBooking, createBooking, getBooking} = require('../controllers/bookingController.js')

router.get('/available', getAvailableTime);
router.post('/createBooking',jwtTokenProvider.authenticateToken, createBooking);
router.get(
  "/getBookings",
  jwtTokenProvider.authenticateToken,
  getBooking                   
);
router.get('/searchBooking',jwtTokenProvider.authenticateToken,searchBooking);

module.exports = router;