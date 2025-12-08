const mongoose = require("mongoose");
const { connectDB } = require("../config/dbConnect"); 

// model for users
const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstName: { type: String, required: true},
  secondName: { type: String, required: true },
  address: {type:String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber:{type:String, required: true},
  isAdmin: {type: Boolean},
  
}, { 
  versionKey: false,
  collection: 'users' 
  
});

const User = mongoose.model("User", UserSchema); 

module.exports = User;