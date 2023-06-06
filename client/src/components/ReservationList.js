import "./ReservationList.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function loadReservations() {
      const response = await fetch("http://localhost:5001/reservations");

      const data = await response.json();
      setReservations(data);
    }
    loadReservations();
  })
  return (
    <>
      <h1>Upcoming reservations</h1>
      {reservations.map((reservation) => (
        <div key={reservation.id} className="restaurant">
        <h2>{reservation.restaurantName}</h2>
        <p>{formatDate(reservation.date)}</p>
        
        <Link to={`/reservations/${reservation.id}`}>View details</Link>
      </div>  
      ))}
    </>
  );
};

export default ReservationList;
