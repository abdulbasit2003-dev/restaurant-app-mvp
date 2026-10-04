const Reservation = require('../models/Reservation');

// Create a table reservation (authenticated user)
exports.createReservation = async (req, res) => {
  try {
    const { table, date, timeSlot, guests } = req.body;
    const reservation = await Reservation.create({
      user: req.user.id,
      table,
      date,
      timeSlot,
      guests
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get logged-in user's reservations
exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate('table');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all reservations (manager only)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'name email').populate('table');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update reservation status (manager only)
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};