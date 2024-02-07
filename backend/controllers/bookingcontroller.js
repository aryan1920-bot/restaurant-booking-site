const moment = require('moment-timezone');
const { Customer, Booking, Slot, Inventory } = require('../models');
const verifyToken = require('../middleware/authmiddleware');

const createBooking = async (req, res) => {
  try {
    const { slot_id, customer_id, num_guests, contact_number, booking_date } = req.body;

    // Assuming customer_id is a foreign key linking to Customers table
    const customer = await Customer.findByPk(customer_id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Validate booking date
    const today = moment().tz('Asia/Kolkata').startOf('day'); // Get current date in Indian time zone
    const bookingDateObj = moment.tz(booking_date, 'YYYY-MM-DD HH:mm:ss', 'Asia/Kolkata');
    console.log(bookingDateObj);
    if (bookingDateObj.isBefore(today)) {
      return res.status(400).json({ error: 'Booking date cannot be before today' });
    }

    const booking = await Booking.create({
      slot_id,
      customer_id,
      customer_name: customer.name,
      contact_number,
      num_guests,
      booking_date: booking_date, 
    });

    const slot = await Slot.findByPk(booking.slot_id);

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Deduct the number of guests from the slot's capacity
    const updatedCapacity = slot.capacity - num_guests;
    await slot.update({ capacity: updatedCapacity });

    // Update quantity in the inventories table
    const inventory = await Inventory.findOne({
      where: {
        restaurant_id: slot.restaurant_id,
        slot_id: booking.slot_id,
      },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    // Deduct quantity by 1
    const updatedQuantity = inventory.quantity - 1;
    await inventory.update({ quantity: updatedQuantity });

    console.log(booking.toJSON());

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBooking };
