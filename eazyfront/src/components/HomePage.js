// // HomePage.js
import React,{useState, useEffect} from "react";
import "./css/HomePage.css";
import RestaurantCard from "./card";
import Footer from "./Footer";
import Header from "./Header";
// import salad from "../images/salad.png";
import Items from "./items";
import RestaurantDetails from "./RestaurantDetails";
import { Link } from 'react-router-dom';


const HomePage = () => {

  const [topRecommendedRestaurants, setTopRecommendedRestaurants] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");

  const handlemeal=()=>{
    window.alert("Feature coming soon");
  }

  useEffect(() => {
    // Fetch the list of top recommended restaurants
    fetch("http://localhost:3005/restaurants/select")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch top recommended restaurants');
        }
        return response.json();
      })
      .then(data => {
        setTopRecommendedRestaurants(data);
      })
      .catch(error => {
        console.error('Error fetching top recommended restaurants:', error);
      });
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("user_name");
    setUserName(userName);
  }, []);

  return (
    <div className="home-container">
      
      <Header/>

      
      <div className="content">
        <h2>{userName ? `WELCOME ${userName.toUpperCase()} !!` : "WELCOME FOODIE !!"}</h2>
        <div className="offer-section">
          <img src="https://i.ibb.co/Tgg83vQ/salad.png" alt="Special Offer" className="salad" />
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
            &#x1F4CC; Near me &#x1F4CC;
          </button>
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍳 Breakfast 🍳
            
          </button>
          <button
            className="meal-btn"
            data-tooltip="Lunch"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
            🍱 Lunch 🍱
          </button>
          <button
            className="meal-btn"
            data-tooltip="Dinner"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          > 
            🍲 Dinner 🍲
          </button>
          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍻 Bar 🍻
          </button>

          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍷 Pub 🍷
          </button>

          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍽️ Buffet 🍽️
          </button>
        </div>
        <h4>Top recommended restaurants !!</h4>
        <div className="card-container">
        <Items allRestaurants={topRecommendedRestaurants} />  {/* Pass top recommended restaurants as prop */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
