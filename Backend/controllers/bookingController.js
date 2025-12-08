import jwtTokenProvider from "../security/auth/jwtTokenProvider.js";
import Booking from "../schemas/booking.js";
import DeletedBooking from "../schemas/deletedBookings.js";
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
  const s = req.query.search

  try {
    const searchDetails = [
      {
    $match: {
      user: userId,
      $or: [
        { serviceTitle: { $regex: s, $options: "i" } },
        { secondName:   { $regex: s, $options: "i" } },
        { address:      { $regex: s, $options: "i" } },
        { postCode:     { $regex: s, $options: "i" } },
      ]
    }
  }
      
     
    ];

    const data = await Booking.aggregate(searchDetails)
    // console.log(await Booking.listIndexes());
    // console.log(data)
    
    res.json({
      data
    }); // send data back to frontend
  } catch (error) {
    console.error("Error in searchBookings", error.message);
    res.status(500).json({ error: "Something went wrong" });
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
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = toDeleteBooking.toObject();

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


