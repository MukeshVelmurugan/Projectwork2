// ========================================
// DELIVERY ROUTES
// ========================================

const express = require('express');
const router = express.Router();
const {
  acceptFood,
  getNGODeliveries,
  getUnassignedDeliveries,
  acceptDelivery,
  startDelivery,
  updateLocation,
  completeDelivery,
  getPartnerDeliveries,
  getAllDeliveriesAdmin,
  getDeliveryById
} = require('../controllers/deliveryController');
const { authenticate, authorize } = require('../middleware/auth');

// ========================================
// NGO ROUTES
// ========================================

// NGO accepts food (creates delivery task)
// POST /api/delivery/accept-food/:foodId
router.post(
  '/accept-food/:foodId',
  authenticate,
  authorize('NGO'),
  acceptFood
);

// Get NGO's accepted deliveries
// GET /api/delivery/ngo
router.get(
  '/ngo',
  authenticate,
  authorize('NGO'),
  getNGODeliveries
);

// ========================================
// DELIVERY PARTNER ROUTES
// ========================================

// Get unassigned delivery tasks
// GET /api/delivery/unassigned
router.get(
  '/unassigned',
  authenticate,
  authorize('Delivery Partner'),
  getUnassignedDeliveries
);

// Accept delivery task
// POST /api/delivery/accept/:id
router.post(
  '/accept/:id',
  authenticate,
  authorize('Delivery Partner'),
  acceptDelivery
);

// Start delivery (change status to In Progress)
// POST /api/delivery/start/:id
router.post(
  '/start/:id',
  authenticate,
  authorize('Delivery Partner'),
  startDelivery
);

// Update delivery location (GPS tracking)
// POST /api/delivery/update-location/:id
router.post(
  '/update-location/:id',
  authenticate,
  authorize('Delivery Partner'),
  updateLocation
);

// Complete delivery (verify OTP)
// POST /api/delivery/complete/:id
router.post(
  '/complete/:id',
  authenticate,
  authorize('Delivery Partner'),
  completeDelivery
);

// Get delivery partner's deliveries
// GET /api/delivery/partner
router.get(
  '/partner',
  authenticate,
  authorize('Delivery Partner'),
  getPartnerDeliveries
);

// ========================================
// SHARED ROUTES
// ========================================

// Get single delivery by ID (for tracking)
// GET /api/delivery/:id
router.get(
  '/:id',
  authenticate,
  getDeliveryById
);

// ========================================
// ADMIN ROUTES
// ========================================

// Get all deliveries (Admin only)
// GET /api/delivery/admin/all
router.get(
  '/admin/all',
  authenticate,
  authorize('Admin'),
  getAllDeliveriesAdmin
);

module.exports = router;
