// Header.js

import React, { useState } from "react";
import "./css/Header.css"; // Import the shared CSS styles
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const [isBookingsHovered, setIsBookingsHovered] = React.useState(false);
  const [isContactUsHovered, setIsContactUsHovered] = React.useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = React.useState(false);

  
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const navigate =useNavigate();
  const logout=()=>{
    navigate('/');
  }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle search submission (e.g., navigate to a search results page)
    console.log("Search submitted:", searchQuery);
  };

  return (
    <header className="header">
      <Link to="/home" style={{ textDecoration: "none", color: "#ff7700" }}>
        <h1 className="brand">Eazydiner</h1>
      </Link>

      
      <nav className="nav">
        <ul>
        
          <li>
            <a
              href="#"
              className="nav-link1"
              onClick={scrollToContact}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link2"
              onClick={logout}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}

            >
              LogOut
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
