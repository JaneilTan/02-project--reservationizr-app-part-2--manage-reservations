import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  const [date, setDate] = useState(new Date());
  const [partySize, setPartySize] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    setIsLoading(true);

    const reservation = {
      date,
      partySize,
      restaurantName,
    }

    const response = await fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/reservations");
    }
  };
  if (isError) {
    return (
      <>
        <p className="no-reservation">
          Error creating a reservation (error status {errorStatus})
        </p>
        <Link to="/" className="button">
          Return to reservation
        </Link>
      </>
    );
  }
  
  return (
  <>
  <form onSubmit={handleSubmit}>
  <div> 
    <label htmlFor="partySize">Number of guest</label>
    <input 
      type="text"
      id="partySize"
      className="form-input"
      value={partySize}
      onChange={(event) => {
        setPartySize(event.target.value);
      }}
      required
    />
   </div> 
   <div>
    <label htmlFor="startDate">Date</label>
      <DatePicker 
      id="startDate"
      className="form-input"
      selected={date} 
      onChange={(date) => setDate(date)} 
      showTimeSelect
      minDate={new Date()}
      required
      /> 
    </div>
    <button className="submit-btn" disabled={isLoading}>
          Submit
        </button>
  </form>
  </>
  );
};

export default CreateReservation;
