// ========================================
// MAIN SERVER FILE
// ========================================
// This is the entry point of our backend application
// It sets up Express server, connects to MongoDB, and configures middleware

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();

// ========================================
// MIDDLEWARE CONFIGURATION
// ========================================

// 1. CORS - Allows frontend to communicate with backend
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL (Vite default port)
  credentials: true
}));

// 2. JSON Parser - Allows Express to read JSON data from requests
app.use(express.json());

// 3. URL Encoded - Allows Express to read form data
app.use(express.urlencoded({ extended: true }));

// 4. Static Files - Serve uploaded images from /uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========================================
// DATABASE CONNECTION
// ========================================

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Exit if database connection fails
});

// ========================================
// API ROUTES
// ========================================

// Health check route - Test if server is running
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Zero Waste Food Redistribution Server is running',
    timestamp: new Date().toISOString()
  });
});

// Route handlers
app.use('/api/auth', authRoutes);           // Authentication routes
app.use('/api/food', foodRoutes);           // Food posting routes
app.use('/api/delivery', deliveryRoutes);   // Delivery routes
app.use('/api/admin', adminRoutes);         // Admin routes

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler - Route not found
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🖼️  Images: http://localhost:${PORT}/uploads`);
  console.log('========================================');
});
