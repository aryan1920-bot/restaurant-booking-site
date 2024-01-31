const {Customer}  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const verifyToken= require('../middleware/authmiddleware');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await Customer.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await Customer.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      console.log(name,email,hashedPassword);
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Customer.findOne({ where: { email } });
        console.log(user);
      if (user && await bcrypt.compare(password, user.password)) {
        // Generate a token
        const token = jwt.sign({ userId: user.id },process.env.JWT_SECRET_KEY, { expiresIn: '30h' });
  
        // Send response with token and user data
        res.status(200).json({
          message: 'Login successful',
          user: {
            email: user.email,
            password: user.password,
          },
          customer: {
            customer_id: user.id,
            customer_name: user.name
          },
          meta:{
            "AccessToken": token,
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = {registerUser, loginUser};
