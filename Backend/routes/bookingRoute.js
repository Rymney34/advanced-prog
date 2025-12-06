const express = require('express');
const router = express.Router();
const jwtTokenProvider = require ("../security/auth/jwtTokenProvider.js");

const {getAvailableTime, searchBooking, createBooking, getBooking, deleteBooking} = require('../controllers/bookingController.js')

router.get('/available', getAvailableTime);
router.post('/createBooking',jwtTokenProvider.authenticateToken, createBooking);
router.get(
  "/getBookings",
  jwtTokenProvider.authenticateToken,
  getBooking                   
);
router.get('/searchBooking',jwtTokenProvider.authenticateToken,searchBooking);

router.delete('/deleteBooking/:id',jwtTokenProvider.authenticateToken,deleteBooking)

module.exports = router;