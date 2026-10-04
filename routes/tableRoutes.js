const express = require('express');
const router = express.Router();
const { getTables, createTable } = require('../controllers/tableController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTables);
router.post('/', protect, authorize('manager'), createTable);

module.exports = router;
