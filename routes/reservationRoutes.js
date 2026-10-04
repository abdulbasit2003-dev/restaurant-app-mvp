const express = require('express');
const router = express.Router();
const { createReservation, getMyReservations, getAllReservations, updateReservationStatus } = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createReservation);
router.get('/my-reservations', protect, getMyReservations);
router.get('/', protect, authorize('manager'), getAllReservations);
router.put('/:id/status', protect, authorize('manager'), updateReservationStatus);

module.exports = router;