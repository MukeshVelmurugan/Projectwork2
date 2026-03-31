// ========================================
// FOOD ROUTES
// ========================================

const express = require('express');
const router = express.Router();
const {
  createFood,
  getAllAvailableFood,
  getDonorFood,
  updateFood,
  deleteFood,
  getAllFoodAdmin
} = require('../controllers/foodController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ========================================
// DONOR ROUTES
// ========================================

// Create new food post (Donor only)
// POST /api/food
router.post(
  '/',
  authenticate,
  authorize('Donor'),
  upload.single('image'), // Handle single image upload
  createFood
);

// Get donor's own food posts (Donor only)
// GET /api/food/donor
router.get(
  '/donor',
  authenticate,
  authorize('Donor'),
  getDonorFood
);

// Update food post (Donor only)
// PUT /api/food/:id
router.put(
  '/:id',
  authenticate,
  authorize('Donor'),
  upload.single('image'), // Optional new image
  updateFood
);

// Delete food post (Donor only)
// DELETE /api/food/:id
router.delete(
  '/:id',
  authenticate,
  authorize('Donor'),
  deleteFood
);

// ========================================
// NGO ROUTES
// ========================================

// Get all available food (NGO)
// GET /api/food
router.get(
  '/',
  authenticate,
  authorize('NGO'),
  getAllAvailableFood
);

// ========================================
// ADMIN ROUTES
// ========================================

// Get all food posts (Admin only)
// GET /api/food/admin/all
router.get(
  '/admin/all',
  authenticate,
  authorize('Admin'),
  getAllFoodAdmin
);

module.exports = router;
