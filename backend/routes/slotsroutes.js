const express = require('express');
const router = express.Router();
const slotsController = require('../controllers/slotscontroller');

// Route to get a slot by its ID along with its associated restaurant
router.get('/:id', slotsController.getSlotById);

module.exports = router;