const Table = require('../models/Table');

// Get all tables
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({});
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a table (manager only)
exports.createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};