import React, { useEffect, useState } from 'react';
import Cards from './card';
import { useNavigate } from 'react-router-dom';
import "./css/Items.css";
import Header from './Header';
import Footer from './Footer';
const RestaurantListing = () => {
  const [list, setlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    // Fetch data from the API endpoint when the component mounts
    fetch('http://localhost:3005/restaurants/select')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched restaurants
        setlist(data);
        // setFilteredRestaurants(data); // Initialize filtered restaurants with all restaurants
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  // Function to handle search input change
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = list.filter(
    (element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle card click and navigate to restaurant details
  const handleCardClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`); // Use navigate instead of history.push
  };

  return (
    <div>
    <Header/>
    <div className="container my-3">
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by Cuisine,Restaurant or Location"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className='bar'
        />
        <button type='submit'>Search</button>
        </form>
      </div>
      <div className="row">
        {filteredList.map((restaurant) => (
          <div className="col-md-4" key={restaurant.id}>
            <div onClick={() => handleCardClick(restaurant.id)}>
              <Cards
                id={restaurant.id}
                title={restaurant.name}
                location={restaurant.location}
                imageUrl={restaurant.image}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default RestaurantListing;
