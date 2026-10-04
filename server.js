const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString()
  });
});

// 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});