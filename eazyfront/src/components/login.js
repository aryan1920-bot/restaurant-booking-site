import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import Footer from "./Footer";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(formData.email);
    setIsEmailValid(isValid);
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'email') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === 'password') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const newuser = () => {
    navigate("/");
  };

  const gotohome = async () => {
    if (!isEmailValid) {
      console.log('Invalid email');
      // You can set a state to display the message in the container
      // For simplicity, I'm using a console.log here
      return;
    }

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
        window.alert("Login failed");
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
    <div>
      <Header/>
      <div
          className="background-container"
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/BnggSSaharc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDCPX6or-vnsPUPgPl3Ntb9yTH82Q)` }}
        ></div>
    <div className="login-container">
      
      <div className="company">
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
              onBlur={handleEmailValidation}
              onChange={handleFormChange}
            />
            {!isEmailValid && <span className="error-message">Invalid email</span>}
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
            className="submit"
            onClick={gotohome}
          >
            Log in
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default Login;
