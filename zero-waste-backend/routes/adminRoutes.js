// ========================================
// ADMIN ROUTES
// ========================================

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAnalytics,
  deleteUser
} = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

// ========================================
// ALL ROUTES REQUIRE ADMIN ROLE
// ========================================

// Get all users
// GET /api/admin/users
router.get(
  '/users',
  authenticate,
  authorize('Admin'),
  getAllUsers
);

// Get analytics data
// GET /api/admin/analytics
router.get(
  '/analytics',
  authenticate,
  authorize('Admin'),
  getAnalytics
);

// Delete user (optional)
// DELETE /api/admin/users/:id
router.delete(
  '/users/:id',
  authenticate,
  authorize('Admin'),
  deleteUser
);

module.exports = router;
