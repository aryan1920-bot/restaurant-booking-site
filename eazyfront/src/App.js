// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/login';
import RestaurantDetails from './components/RestaurantDetails';
import ReviewBooking from './components/ReviewBooking';
import BookingConfirmation from './components/BookingConfirmation';
import Signup from './components/signup';
import RestaurantListing from './components/Restaurantlisting'; 

const App = () => {
  return (

    <div>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/review-booking" element={<ReviewBooking />} />
      <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
      <Route path="/restaurant-listing" element={<RestaurantListing />} />
    </Routes></div>
  );
};

export default App;
