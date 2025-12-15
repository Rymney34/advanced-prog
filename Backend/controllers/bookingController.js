import jwtTokenProvider from "../security/auth/jwtTokenProvider.js";
import Booking from "../schemas/booking.js";
import DeletedBooking from "../schemas/deletedBookings.js";
import{SearchBookingFacade } from "../facades/searchBookingFacade.js";



import mongoose from"mongoose";

import lock from "../config/lock.js"

export const createBooking = async(req, res) => {

  const lockKey = 'allBookingCreation';//unique for reference 
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
      //lock booking or allows to have queue of bookiong craeting on the user side 
    const newBooking = await lock.acquire(lockKey, async () => {
        

      const booking = new Booking({
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
      
      await booking.save(); //throws an error if document was update by another process
      return booking
      
    })
    res.status(201).json({
        success:true,
        data: newBooking, 
        message: "Good job, Booking submitted"
      });

  }catch (error) {
    if(error.code === 11000){
      return res.status(409).json({
        success: false,
        message: "Unfortunately time is alredy booked for this date"
      })
    }
     console.error("Error :", error); 
    res.status(400).json({ error: error.message });
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
    console.log("Backend console - data:", data); 
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

    const { date, update, bookedTime} = req.query;;
    try{

    const booked = await Booking.find({ date });
    const bookedTimes = booked.map(b => b.time);
    const available = allTimes.filter(t => !bookedTimes.includes(t));

    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let timeNow = `${hours}:${minutes}`

    

    if(update === "true"){
      let availableTimes = allTimes.filter(time => {
              
              if (bookedTimes.includes(time) && time !== bookedTime) {
                  return false;
              }


              if (date === currentDate && time < timeNow) {
                  return false;
              }

              return true;
      });

          return res.json(availableTimes);
    }

      //remove time for TODAY if time already is gone 
    if(date === currentDate){
     
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
  const search = req.query.search

  try {
    const data = await SearchBookingFacade.search(userId, search);
    res.json({data});
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }

}

export const deleteBooking = async(req, res) => {

   const userId = new mongoose.Types.ObjectId(req.user.sub);
  const bookingId = new mongoose.Types.ObjectId(req.params.id);
    console.log("Booking Id " + bookingId)
    console.log(userId)
  try {
  

    const toDeleteBooking = await Booking.findOne({ _id: bookingId, user: userId });
    // console.log(await Booking.listIndexes());

    console.log(toDeleteBooking)
    

    if (!toDeleteBooking) {
      console.log("Alredy Deleted or notc Found")
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = toDeleteBooking.toObject();

    console.log(booking._id)

    await DeletedBooking.create({
      originalBookingId: booking._id,
      userId: booking.user,
      serviceTitle: booking.serviceTitle,
      firstName: booking.firstName,
      secondName: booking.secondName,
      address: booking.address,
      postCode: booking.postCode,
      bookingNote: booking.bookingNote,
      date: booking.date,
      time: booking.time,
      phoneNumber: booking.phoneNumber,
    });
    
    await Booking.deleteOne({ _id: bookingId });

    res.json({
          message: "Booking deleted successfully!"
    }); 

  } catch (error) {
    console.error("Error in deleted booking", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }


}

export const updateBooking = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.sub);
    // const bookingId = new mongoose.Types.ObjectId(req.params._id);
    // console.log("Booking Id " + bookingId)
    console.log(userId)

    const { 
        _id,
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

    const updatingBooking = await Booking.replaceOne({ _id: _id, user: userId },{
      // _id: _id,
      user: userId,  
      serviceTitle:serviceTitle,
      firstName:firstName,
      secondName:secondName,
      address:address,
      postCode:postCode,
      bookingNote:bookingNote,
      date:date,
      time:time,
      phoneNumber:phoneNumber,
    },
    {
      $inc: { balance: 1 }
    });

    if (!updatingBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({
          close: true,
          message: "Booking Updated successfully!"
    }); 

  } catch (error) {
    console.error("Error in deleted booking", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}


