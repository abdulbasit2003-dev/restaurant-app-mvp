const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Ready', 'Served', 'Cancelled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);