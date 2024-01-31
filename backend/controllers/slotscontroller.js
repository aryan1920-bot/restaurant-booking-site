const asyncHandler = require('express-async-handler');
const { Slot, Restaurants } = require('../models');

const getSlotById = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Slot.findByPk(id, {
      include: Restaurants // Assuming the association is named 'Restaurants'
    });

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    res.status(200).json(slot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getSlotById
};