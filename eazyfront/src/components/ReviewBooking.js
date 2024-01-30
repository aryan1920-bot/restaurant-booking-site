// ReviewBooking.js
import React from "react";
// import { useNavigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./css/ReviewBooking.css"

const ReviewBooking = ({ bookingDetails }) => {
  //   const { restaurantName, selectedDate, selectedSlot, numberOfGuests } = bookingDetails;
  const history = useNavigate();

  const handleConfirmBooking = () => {
    // Perform actions to confirm the booking
    // For simplicity, let's redirect to a success page
    history("/BookingConfirmation");
  };

  const handleModify=()=>{
    // history('')
    //link the restaurantdetails page
  }

  return (
    <div>
  <Header />
  <div className="container-con">
    <h2>Review Your Booking...</h2>
    <p>Restaurant: </p>
    <p>Date: </p>
    <p>Slot: </p>
    <p>Number of Guests:</p>
    <div>
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
      
      <button onClick={handleModify}>Modify Booking</button>
      
    </div>
  </div>
  <Footer />
</div>
  );
};

export default ReviewBooking;
