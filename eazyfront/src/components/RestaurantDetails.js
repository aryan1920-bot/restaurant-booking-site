import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/RestaurantDetails.css";
import Header from "./Header";
import Footer from "./Footer";

const RestaurantDetails = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/restaurants/byId/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setRestaurantData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBookNowClick = async () => {
    if (!selectedDate || !selectedSlot || numberOfGuests < 1) {
      console.error("Please provide valid booking details");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/bookings/createBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot_id: selectedSlot, 
          num_guests: numberOfGuests,
          booking_date: selectedDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
      }

      console.log("Booking created successfully");

      navigate("/review-booking");
    } catch (error) {
      console.error("Error creating booking:", error);

    }
  };

  if (!restaurantData) {
    return (
      <div>
        <Header />
        <div className="bgbg">
          <div className="restaurant-not-found">
            <p>Loading...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bgbg">
        <div className="restaurant-details-container">
          <div className="restaurant-details">
            <img
              src={restaurantData.image}
              alt={restaurantData.name}
              className="restaurant-image"
            />
            <h2 className="restaurant-name">{restaurantData.name}</h2>
            <p className="restaurant-info">
              Cuisine: {restaurantData.cuisine_type}
            </p>

            <p className="restaurant-info">Location: {restaurantData.location}</p>

            <div className="booking-section">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="ip"
              />

              <label htmlFor="slot">Select Slot:</label>
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="" disabled>
                  Select Slot
                </option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>

              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />

              <button className="book-now-btn" onClick={handleBookNowClick}>
                Book Now
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RestaurantDetails;

