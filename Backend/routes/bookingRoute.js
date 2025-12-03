const express = require('express');
const router = express.Router();

const {getAvailableTime, createBooking} = require('../controllers/bookingController.js')

router.get('/available', getAvailableTime);
router.post('/createBooking', createBooking);

module.exports = router;