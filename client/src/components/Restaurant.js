import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";


const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = await fetch(`http://localhost:5001/restaurants/${id}`);
      // FIXME: Make a fetch request and call setRestaurant with the response body
     

      const data = await fetchUrl.json();
      setRestaurant(data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="restaurant-container" key={restaurant.id}>
      <img src={restaurant.image} alt="Yummy food" />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <h3>Reserve {restaurant.name}</h3>
      <CreateReservation restaurantName={restaurant.name} />
      </div>
    </>
  );
};

export default Restaurant;
