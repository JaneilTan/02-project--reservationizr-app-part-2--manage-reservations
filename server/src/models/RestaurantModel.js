// FIXME: Add a Mongoose model here
const mongoose = require ("mongoose");
const { Schema } = mongoose;

const restaurantSchema = Schema({ 
  id: {type: String, required: true},
  name: { type: String, required:true },
  description: {type: String, required: true},
  image: {type: String, required: true},
 
});



const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = RestaurantModel;