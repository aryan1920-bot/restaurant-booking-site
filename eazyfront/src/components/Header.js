// Header.js
import React, { useState } from "react";
import "./css/Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
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
              {token ? "Log out" : "Sign up"}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
