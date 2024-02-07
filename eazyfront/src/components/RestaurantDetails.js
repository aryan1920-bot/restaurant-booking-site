import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/RestaurantDetails.css";
import Header from "./Header";
import Footer from "./Footer";

const RestaurantDetails = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [data, setData] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 3);
  const formattedMaxDate = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/slots/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
        console.log("Fetched data:", data);

        setRestaurantData(data.Restaurant);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generateTimeSlots = () => {
    const timeSlots = data?.Slots.map((slot) => slot.start_time) || [];
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  const handleBookNowClick = async () => {
    setDateError("");
    setSlotError("");
    setPhoneNumberError("");

    let isErrorsPresent = false;

    if (!selectedDate) {
      setDateError("Not valid date");
      isErrorsPresent = true;
    }

    if (!selectedSlot) {
      setSlotError("Not valid slot");
      isErrorsPresent = true;
    }

    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setPhoneNumberError("not valid contact");
      isErrorsPresent = true;
    }

    if (isErrorsPresent) {
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const handleModifyBooking = () => {
    setPopupVisible(false);
  };

  const handleConfirmBooking = async () => {
    try {
      const customer_id = localStorage.getItem("user_id");
      const customer_name = localStorage.getItem("user_name");
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/");
        return;
      }

      // First API call to create entry
      const createEntryResponse = await fetch(
        "http://localhost:3005/inventories/createEntry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            restaurant_id: restaurantData.id,
            slot_id: data?.Slots.find(
              (slot) => slot.start_time === selectedSlot
            )?.id,
            date: selectedDate,
            numberOfGuests: numberOfGuests,
          }),
        }
      );

      if (!createEntryResponse.ok) {
        throw new Error(
          `Failed to create entry: ${createEntryResponse.statusText}`
        );
      }

      const createEntryData = await createEntryResponse.json();
      const slotId = createEntryData.slot_id;

      // Second API call to create booking
      const createBookingResponse = await fetch(
        "http://localhost:3005/bookings/createBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slot_id: slotId,
            customer_id: customer_id,
            customer_name: customer_name,
            contact_number: phoneNumber,
            num_guests: numberOfGuests,
            booking_date: selectedDate,
          }),
        }
      );

      if (!createBookingResponse.ok) {
        throw new Error(
          `Failed to create booking: ${createBookingResponse.statusText}`
        );
      }

      console.log("Booking created successfully");

      navigate("/BookingConfirmation", {
        state: {
          bookingDetails: {
            restaurantName: restaurantData.name,
            selectedDate: selectedDate,
            selectedSlot: selectedSlot,
          },
        },
      });
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
        {/* <div
          className="background-container"
          style={{ backgroundImage: `url(${restaurantData.image})` }}
        ></div> */}

        <div
          className="background-container"
          style={{ backgroundImage: `url(https://c.ndtvimg.com/2023-11/c4bp49g_restaurant-generic_625x300_21_November_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738)` }}
        ></div>
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

            <p className="restaurant-info">
              Location: {restaurantData.location}
            </p>

            <div className="booking-section">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={currentDate}
                // max={formattedMaxDate}
                className="ip"
              />
              <span className="error-message">{dateError}</span>

              <label htmlFor="slot">Select Slot:</label>
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="" disabled>
                  Select Slot
                </option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <span className="error-message">{slotError}</span>

              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={numberOfGuests}
                onChange={(e) =>
                  setNumberOfGuests(
                    Math.max(1, Math.min(4, parseInt(e.target.value, 10)))
                  )
                }
                min="1"
                max="4"
              />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                pattern="[0-9]{10}"
                maxLength="10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="ip"
              />
              <span className="error-message">{phoneNumberError}</span>

              <button className="book-now-btn" onClick={handleBookNowClick}>
                Book Now
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>
              <strong>Booking Details</strong>
            </h2>
            <p style={{ textAlign: "justify" }}>
              Restaurant: <strong>{restaurantData.name}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Date: <strong>{selectedDate}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Slot:<strong> {selectedSlot}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Guests: <strong>{numberOfGuests}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Phone Number: <strong>{phoneNumber}</strong>
            </p>
            <div className="popup-buttons">
              <button onClick={handleModifyBooking} className="cancel">
                Cancel
              </button>
              <button onClick={handleConfirmBooking} className="confirm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
