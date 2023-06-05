// FIXME: Add a Mongoose model here
const mongoose = require ("mongoose");
const { Schema } = mongoose;

const reservationSchema = Schema({ 
  partySize: {type: Number, required: true},
  date: { type: Date, default: Date.now, required:true },
  userId: {type: String, required: true},
  restaurantName: {type: String, required: true},
  createdBy: {type: String, required: true},
});



const ReservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = ReservationModel;