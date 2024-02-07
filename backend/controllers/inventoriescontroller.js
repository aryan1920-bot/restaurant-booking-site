const { Inventory } = require('../models');

const createInventoryEntry = async (req, res) => {
  try {
    const {
      restaurant_id,
      slot_id,
      date,
      numberOfGuests,
    } = req.body;

    // Assuming 'date' is in 'YYYY-MM-DD HH:mm:ss' format
    const inputDate = new Date(date + ' UTC');  // Convert input date to UTC

    // Find existing entry for the given restaurant, slot, and date
    const existingEntry = await Inventory.findOne({
      where: {
        slot_id,
        restaurant_id,
        date: inputDate,
      },
    });

    console.log(existingEntry);

    if (existingEntry) {
      // If entry exists, update the quantity by decrementing the number of guests
      existingEntry.quantity -= numberOfGuests;

      if (existingEntry.quantity < 0) {
        console.error('Error: Quantity is negative after update.');
        res.status(500).json({ error: 'Negative quantity error' });
        return;
      }

      // Save the changes to the existing entry
      await existingEntry.save();

      res.status(200).json(existingEntry);
    } else {
      // If entry doesn't exist, create a new one with the original quantity of 50
      const newEntry = await Inventory.create({
        restaurant_id,
        slot_id,
        quantity: Math.max(0, 50 - numberOfGuests),
        date: inputDate,
      });
      res.status(201).json(newEntry);
    }
  } catch (error) {
    console.error('Error creating/updating inventory entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createInventoryEntry,
};
