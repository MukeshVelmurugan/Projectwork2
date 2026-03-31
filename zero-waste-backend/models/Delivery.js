// ========================================
// DELIVERY MODEL
// ========================================
// Defines the structure of Delivery tasks in MongoDB

const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  // Reference to the food being delivered
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },

  // Reference to the donor
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reference to the NGO that accepted the food
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reference to the delivery partner (null until assigned)
  deliveryPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  // Current delivery status
  status: {
    type: String,
    enum: ['Unassigned', 'Assigned', 'In Progress', 'Completed'],
    default: 'Unassigned'
  },

  // Current location of delivery partner (updated during tracking)
  currentLat: {
    type: Number,
    default: null
  },

  currentLng: {
    type: Number,
    default: null
  },

  // 4-digit OTP for delivery completion
  otp: {
    type: String,
    required: true,
    length: 4
  },

  // Timestamp when delivery was completed
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Delivery', deliverySchema);
