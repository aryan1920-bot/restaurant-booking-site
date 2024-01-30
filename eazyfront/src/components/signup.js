import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import Footer from "./Footer";

const Signup = () => {
  const navigate = useNavigate();

  // const [action, setAction] = useState("Signup");

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
  //change here
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

        // Redirect to another page if needed
        navigate("/login");
      } else {
        console.error("Signup failed:", data);

        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error("Error during signup:", error);

      // Handle error, show error message, etc.
    }
  };

  const alreadyuser=()=>{
    navigate("/login");
  }

  return (
    <div className="login-container">
      <div className="company">
        <h1>Eazydiner</h1>
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
          <div className="submit" onClick={handleSignup}>
            Sign Up
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
