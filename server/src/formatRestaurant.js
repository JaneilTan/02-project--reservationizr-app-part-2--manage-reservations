const formatRestaurant = (restaurant) => {
    return {
      id: restaurant._id,
      name: restaurant.name,
      description: restaurant.description,
      image: restaurant.image,
      createdBy: restaurant.createdBy,
    };
  };
  
  module.exports = formatRestaurant;