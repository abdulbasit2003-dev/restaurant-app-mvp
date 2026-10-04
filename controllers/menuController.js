const MenuItem = require('../models/MenuItem');

// Get all menu items (public)
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a menu item (manager only)
exports.createMenuItem = async (req, res) => {
  try {
    const newItem = await MenuItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a menu item (manager only)
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a menu item (manager only)
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};