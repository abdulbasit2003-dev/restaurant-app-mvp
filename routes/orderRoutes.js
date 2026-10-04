const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, authorize('manager'), getAllOrders);
router.put('/:id/status', protect, authorize('manager'), updateOrderStatus);

module.exports = router;