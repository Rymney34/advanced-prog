const mongoose = require("mongoose");
const { connectDB } = require("../config/dbConnect"); // Make sure to import usersConnection

// Define the schema and model using usersConnection
const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  address: {type:String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber:{type:String, required: true},
  
}, { 
//   versionKey: false, // Removes "__v": 0 from Document
  collection: 'users' // Set collection name to 'Users'
});

const User = mongoose.model("User", UserSchema); 

module.exports = User;