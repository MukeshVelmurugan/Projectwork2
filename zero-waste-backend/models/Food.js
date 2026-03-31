// ========================================
// FOOD MODEL
// ========================================
// Defines the structure of Food posts in MongoDB

const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  // Food item title
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },

  // Detailed description
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },

  // Quantity of food
  quantity: {
    type: String,
    required: [true, 'Quantity is required'],
    trim: true
  },

  // Text address for pickup
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required'],
    trim: true
  },

  // GPS coordinates
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
    min: -90,
    max: 90
  },

  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
    min: -180,
    max: 180
  },

  // Path to uploaded image
  imagePath: {
    type: String,
    required: [true, 'Image is required']
  },

  // Category determines how food will be used
  category: {
    type: String,
    enum: ['Human Consumption', 'Cattle Feed', 'Biogas / Compost'],
    required: [true, 'Category is required']
  },

  // Current status of the food post
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'Completed'],
    default: 'Available'
  },

  // Reference to the donor who posted this food
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Food', foodSchema);
