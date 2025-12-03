
import Booking from "../schemas/booking.js";

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

      if (! serviceTitle || !firstName || !secondName || !address ||!postCode  || !bookingNote || !date ||!time ||  !phoneNumber ) {
        return res.status(400).json({ error: "Missing required fields" });
      }


      const newBooking = await Booking({
        serviceTitle,
        firstName,
        secondName,
        address,
        postCode,
        bookingNote,
        date,
        time,
        phoneNumber,
      })

      await newBooking.save();

      res.status(201).json({
        _id: newBooking._id,
        serviceTitle: newBooking.serviceTitle,
        firstName: newBooking.firstName,
        secondName: newBooking.secondName,
        address: newBooking.address,
        postCode: newBooking.postCode,
        bookingNote: newBooking.bookingNote,
        date: newBooking.date,
        time: newBooking.time,
        phoneNumber:newBooking.phoneNumber,
      })

  }catch (err) {
     console.error("Error :", err); 
    res.status(400).json({ error: err.message });
  }
}

export async function getBooking(req, res) {
  try {
    const serviceDetails = [
      { $match: {} }  // get all documents
    ];

    const data = await Services.aggregate(serviceDetails);

    console.log("Backend console - data:", data); // THIS will print in your backend terminal

    res.json(data); // send data back to frontend
  } catch (error) {
    console.error("Error in getServiceCard:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}
// app.get("/available",

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
    console.log(date)

  const booked = await Booking.find({ date });
  console.log("its booked" + booked)
  const bookedTimes = booked.map(b => b.time);

  const available = allTimes.filter(t => !bookedTimes.includes(t));

  res.json(available);
  }catch(error){
    console.error(error.message)
  }
  


};