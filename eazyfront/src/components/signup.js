//signup
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import Footer from "./Footer";
import Header from "./Header";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3005/customers/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);

        navigate("/login");
      } else {
        console.error("Signup failed:", data);


      }
    } catch (error) {
      console.error("Error during signup:", error);

    }
  };


  const alreadyuser=()=>{
    navigate("/login");
  }

  return (
    <div>
      <Header/>
      <div
          className="background-container"
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/BnggSSaharc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDCPX6or-vnsPUPgPl3Ntb9yTH82Q)` }}
        ></div>
    <div className="login-container">
      <div className="company">
        {/* <h1>Eazydiner</h1> */}
      </div>
      <div className="login-c">
        <div className="login">
          <div className="text">Sign up</div>
        </div>
        <div className="inputs">
          {(
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
          )}
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="forgot-password">
          Already have an account? <span onClick={alreadyuser}>Log in</span>
        </div>
        <div className="submit-c">
          <div className="submit" onClick={handleSignup} tabIndex={0} role="button">
            Sign Up
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default Signup;
