// ========================================
// AUTHENTICATION ROUTES
// ========================================

const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// ========================================
// PUBLIC ROUTES (No authentication required)
// ========================================

// Register new user
// POST /api/auth/register
router.post('/register', register);

// Login user
// POST /api/auth/login
router.post('/login', login);

// ========================================
// PROTECTED ROUTES (Authentication required)
// ========================================

// Get current user profile
// GET /api/auth/me
router.get('/me', authenticate, getProfile);

module.exports = router;
