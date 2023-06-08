const formatReservation = (reservation) => {
    return {
      id: reservation._id,
      partySize: reservation.partySize,
      date: reservation.date,
      restaurantName: reservation.restaurantName,
    };
  };
  
  module.exports = formatReservation;