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
  //changehere
  const gotohome = async () => {
    try {
      const response = await fetch("http://localhost:3005/customers/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Assuming the API returns a token on successful login
      const { token } = await response.json();

      // Store the token in localStorage or a state management solution
      localStorage.setItem("authToken", token);

      // Redirect to the home page or any other desired page on successful login
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login failure (show error message, etc.)
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

