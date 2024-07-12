// booking.routes.js
const mongoose = require("mongoose");

// Replace with your MongoDB connection string
const connectionString =
  "mongodb+srv://josephtomy02:nypTxnJpT33mUMxx@cluster0.q0pzxp5.mongodb.net/automated_h_test?retryWrites=true&w=majority";

const express = require('express');
const Booking = require('./booking.model');

const router = express.Router();

// Route to handle booking creation
router.post('/bookings', async (req, res) => {
  console.log("entered in bookings")
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { date, slot, username } = req.body;
    const booking = await Booking.create({ date, slot, username });
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
});

module.exports = router;
