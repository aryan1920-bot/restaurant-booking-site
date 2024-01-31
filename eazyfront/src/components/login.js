// // Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const  newuser=()=>{
    navigate("/");
  }

  const gotohome = async () => {
    try {
      const response = await fetch("http://localhost:3005/customers/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        window.alert("Login Failed");
        throw new Error("Login failed");
      }
  
      const responseData = await response.json();
  
      // Store the access token in localStorage
      localStorage.setItem("accessToken", responseData.meta.AccessToken);
      localStorage.setItem("user_id", responseData.customer.customer_id);
      localStorage.setItem("user_name", responseData.customer.customer_name);
  
      // Navigate to the "/home" page
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="company">
        <h1>Eazydiner</h1>
      </div>
      <div className="login-c">
        <div className="login">
          <div className="text">Log in</div>
        </div>
        <div className="inputs">
          
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
          Forgot Password? <span>Click here</span>
        </div>
        <div className="forgot-password">
          New user? <span onClick={newuser}>Sign up</span>
        </div>
        <div className="submit-c">
          
          <div
            className="submit" onClick={gotohome}
          >
            Log in
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

