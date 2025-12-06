import jwtTokenProvider from "../security/auth/jwtTokenProvider.js";
import Booking from "../schemas/booking.js";
import mongoose from"mongoose";



export const createBooking = async(req, res) => {

  try{
      const {
        
        serviceTitle,
        firstName,
        secondName,
        address,
        postCode,
        bookingNote,
        date,
        time,
        phoneNumber,
      } = req.body;

      if (! serviceTitle || !firstName || !secondName || !address ||!postCode || !date ||!time ||  !phoneNumber ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
   

    const newBooking = new Booking({
      user: req.user.sub,  
      serviceTitle,
      firstName,
      secondName,
      address,
      postCode,
      bookingNote,
      date,
      time,
      phoneNumber,
    });

    await newBooking.save();

    res.status(201).json(newBooking);

  }catch (err) {
     console.error("Error :", err); 
    res.status(400).json({ error: err.message });
  }
}

export async function getBooking(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit  = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  
  const userId = req.user.sub; 
 
  try {
    const bookingDetails = { user: userId }

    const data = await Booking.find(bookingDetails)
      .skip(skip)
      .limit(limit)

    const total = await Booking.countDocuments(bookingDetails);
    // console.log("Backend console - data:", data); 
    // console.log(await Booking.listIndexes());
    
    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data
    }); // send data back to frontend
  } catch (error) {
    console.error("Error in getBookingDetails", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// get date trouh url from fronend then find time within these dates and return allTimes but with no 
export async function getAvailableTime(req, res) {

    const allTimes = [
        "10:00",
        "13:30",
        "16:30",
        "18:30",
        "20:30",
    ];

    const { date } = req.query;;
    try{

    const booked = await Booking.find({ date });
    const bookedTimes = booked.map(b => b.time);
    const available = allTimes.filter(t => !bookedTimes.includes(t));

    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    if(date === currentDate){
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let timeNow = `${hours}:${minutes}`
      const newAvailable = available.filter(t => t > timeNow);

      return res.json(newAvailable);
    }
    

    res.json(available);

  }catch(error){
    console.error(error.message)
  }
};

export const searchBooking = async(req, res) => {

  const userId = new mongoose.Types.ObjectId(req.user.sub);
  const s = req.query.search
    console.log(s)
  try {
    const searchDetails = [
      {
    $match: {
      user: userId,
      $text: { $search: s },
    }
  }
      
     
    ];

    const data = await Booking.aggregate(searchDetails)
    // console.log(await Booking.listIndexes());
    console.log(data)
    
    res.json({
      data
    }); // send data back to frontend
  } catch (error) {
    console.error("Error in searchBookings", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }


}
