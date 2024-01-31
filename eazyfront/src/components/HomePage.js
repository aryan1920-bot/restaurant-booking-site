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

  const handlemeal=()=>{
    window.alert("Feature coming soon");
  }

  const userName = localStorage.getItem("user_name");

  return (
    <div className="home-container">
      <Header/>
      <div className="content">
        <h2>{userName ? `WELCOME ${userName.toUpperCase()} !!` : "WELCOME FOODIE !!"}</h2>
        {/* <div className="search-bar">
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
        </div> */}
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
            onClick={handlemeal}
          >
            Near me
          </button>
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
            Breakfast
            
          </button>
          <button
            className="meal-btn"
            data-tooltip="Lunch"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
            Lunch
          </button>
          <button
            className="meal-btn"
            data-tooltip="Dinner"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
            Dinner
          </button>
          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
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
