// BookingConfirmation.js
import React from "react";
import "./css/BookingConfirmation.css"; // Create a CSS file for styling'
import tick from "../images/tick.png"
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const BookingConfirmation = ({}) => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  return (
    <div>
      <Header/>
      <img src={tick} className="tick"></img>
    <div className="confirmation-container">
      <div className="confirmation-card">
      <h2>Booking Confirmed!</h2>
      <p>Meet us at {' '} <strong>{bookingDetails.restaurantName}</strong>{' '} around {' '}<strong>{bookingDetails.selectedSlot}</strong>{' '} on {' '}<strong>{bookingDetails.selectedDate}</strong>
      😄🍴</p>
</div>
      </div>   
      <Footer/>  
    </div>
  );
};

export default BookingConfirmation;
