import "./ReservationList.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDate } from "../utils/formatDate";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function loadReservations() {
    
    const accessToken = await getAccessTokenSilently();
    const response = await fetch("http://localhost:5001/reservations", {
    
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
        
      const data = await response.json();
      setReservations(data);
    }
    loadReservations();
  }, [getAccessTokenSilently])
  return (
    <>
      <h1>Upcoming reservations</h1>
      {reservations.map((reservation) => (
        <div key={reservation.id} className="restaurant">
        <h2>{reservation.restaurantName}</h2>
        <p>{formatDate(reservation.date)}</p>
        
        <Link to={`/reservations/${reservation.id}`}>View the restaurants</Link>
      </div>  
      ))}
    </>
  );
};

export default ReservationList;
