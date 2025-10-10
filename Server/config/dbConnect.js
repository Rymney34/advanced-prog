const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require("../schemas/user");

// Load environment variables
dotenv.config({ path: './config/config.env' });

async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
   
    //  const users = await User.find();
    // console.log('Users in DB:', users);
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

module.exports = connectDB();