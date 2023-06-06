import "./RestaurantList.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function loadRestaurants() {
      const response = await fetch("http://localhost:5001/restaurants");

      const data = await response.json();
      setRestaurants(data);
    }
    loadRestaurants();
  })
  return (
    <>
      <h1>Restaurants</h1>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="restaurantName">
          <img src={restaurant.image} alt="Yummy food" />
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          
          <Link to={`/restaurants/${restaurant.id}`}>Reserve now</Link>
        </div>
      ))}
    </>
  );
};

export default RestaurantList;
