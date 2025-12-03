const mongoose = require("mongoose");
const { connectDB } = require("../config/dbConnect"); 

// model for services
const bookingSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    serviceTitle:{type: String, required: true},
    firstName: { type: String, required: true},
    secondName: { type: String, required: true },
    address: {type:String, required: true},
    // email: { type: String, required: true, unique: true },
    postCode: {type:String, required: true},
    bookingNote: {type:String, required: true},
    date: {type: String,required: true},
    time:  {type: String, required: true},
    phoneNumber:{type:String, required: true},
}, { 
  versionKey: false,
  collection: 'bookings' 
  
});

const Booking = mongoose.model("bookings", bookingSchema); 

module.exports = Booking;