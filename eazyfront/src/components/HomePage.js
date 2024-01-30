// // HomePage.js
import React,{useState, useEffect} from "react";
import "./css/HomePage.css";
import RestaurantCard from "./card";
import Footer from "./Footer";
import Header from "./Header";
import salad from "../images/salad.png";
import Items from "./items";
import RestaurantDetails from "./RestaurantDetails";
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [restaurantIds, setRestaurantIds] = useState([]);

  const [isHovered, setIsHovered] = React.useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleCardClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle search submission (e.g., filter and update the list of restaurants)
    const filtered = Items.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    const fetchRestaurantIds = async () => {
      try {
        const response = await fetch("/sample.json");
        const data = await response.json();
        const ids = data.map((restaurant) => restaurant.id);
        setRestaurantIds(ids);
      } catch (error) {
        console.error("Error fetching restaurant IDs:", error);
      }
    };

    fetchRestaurantIds();
  }, []);
  return (
    <div className="home-container">
      <Header/>
      <div className="content">
        <h2>WELCOME FOODIE !!</h2>
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by Cuisine, Restaurant, or Location..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bar"
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="offer-section">
          <img src={salad} alt="Special Offer" className="salad" />
        </div>
        <h4>What's your pick for today ?</h4>
        <div className="meal-tabs">
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Near me
          </button>
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Breakfast
            
          </button>
          <button
            className="meal-btn"
            data-tooltip="Lunch"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Lunch
          </button>
          <button
            className="meal-btn"
            data-tooltip="Dinner"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Dinner
          </button>
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Bar/Pub
          </button>
        </div>
        <h4>Top recommended restaurants !!</h4>
        <div className="card-container">
          <Items />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
