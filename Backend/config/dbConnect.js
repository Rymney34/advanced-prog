const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require("../schemas/user");

// Load environment variables
dotenv.config({ path: './config/config.env' });


class ConnectDB {
  constructor() {
    if (ConnectDB.instance) {
      return ConnectDB.instance; 
    }

    this._connect(); 
    ConnectDB.instance = this; 
  }

  async _connect() {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.ATLAS_URI, {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        });
         console.log(' MongoDB connected successfully ');
      } else {
        console.log('MongoDB connection already established');
      }
    } catch (err) {
       console.error(' Connection error:', err.message);
      process.exit(1);
    }
  }
//   async _connect() {
//   try {
//     if()
//     await mongoose.connect(process.env.ATLAS_URI);
   
//      console.log(' MongoDB connected successfully');
//   } catch (err) {
//     console.error(' Connection error:', err.message);
//   }
// }
}



const dbInstance = new ConnectDB();
module.exports = dbInstance;