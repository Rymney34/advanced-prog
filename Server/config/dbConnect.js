const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require("../schemas/user");

// Load environment variables
dotenv.config({ path: './config/config.env' });

async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
   
     console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

module.exports = connectDB;