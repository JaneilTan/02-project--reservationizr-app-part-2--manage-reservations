// FIXME: Add a Mongoose model here
const mongoose = require ("mongoose");
const { Schema } = mongoose;

const reservationSchema = Schema({ 
  partySize: {type: Number, required: true},
  date: { type: Date, required: true },
  restaurantName: {type: String, required: true},
  userId: {type: String, required: true},
});



const ReservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = ReservationModel;