const asyncHandler = require('express-async-handler');
const { Restaurants } = require('../models');  // Assuming your model is exported as Restaurants

const restaurantsController = {
  selectAll: asyncHandler(async (req, res) => {
    try {
      const allRestaurants = await Restaurants.findAll();
      res.status(200).json(allRestaurants);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving restaurants' });
    }
  }),
  insert: asyncHandler(async (req, res) => {
    try {
      const { name, image, location, cuisine_type } = req.body;

      // Create a new restaurant
      const newRestaurant = await Restaurants.create({
        name,
        image,
        location,
        cuisine_type,
      });

      res.status(201).json({ message: 'Insert successful', restaurant: newRestaurant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error during insertion' });
    }
  }),

  byId: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from the URL path parameters
  
      const restaurant = await Restaurants.findByPk(id);
  
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      res.status(200).json(restaurant);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving restaurant by ID' });
    }
  }),
  
};



module.exports = restaurantsController;
