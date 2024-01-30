// BookingConfirmation.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/BookingConfirmation.css"; // Create a CSS file for styling'
import tick from "../images/tick.png"
import Header from "./Header";
import Footer from "./Footer";

const BookingConfirmation = ({ bookingDetails }) => {
  // const { restaurantName, selectedDate, selectedSlot } = bookingDetails;

  return (
    <div>
      <Header/>
      <img src={tick} className="tick"></img>
    <div className="confirmation-container">
      <div className="confirmation-card">
      <h2>Booking Confirmed!</h2>
        {/* <p>Your booking is confirmed.</p> */}
        {/* <p>See you at {restaurantName} for {selectedSlot} on {selectedDate}.</p> */}
      </div>
      </div>   
      <Footer/>  
    </div>
  );
};

export default BookingConfirmation;
