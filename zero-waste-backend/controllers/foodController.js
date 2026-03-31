// ========================================
// FOOD CONTROLLER
// ========================================
// Handles food posting, viewing, editing, and deletion

const Food = require('../models/Food');
const path = require('path');
const fs = require('fs');

// ========================================
// CREATE NEW FOOD POST
// ========================================
// POST /api/food
exports.createFood = async (req, res) => {
  try {
    const { title, description, quantity, pickupLocation, latitude, longitude, category } = req.body;

    // Validate required fields
    if (!title || !description || !quantity || !pickupLocation || !latitude || !longitude || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Validate category
    const validCategories = ['Human Consumption', 'Cattle Feed', 'Biogas / Compost'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    // Create food post
    const food = await Food.create({
      title,
      description,
      quantity,
      pickupLocation,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      imagePath: req.file.filename, // Store only filename
      category,
      status: 'Available',
      donorId: req.user._id
    });

    // Populate donor details
    await food.populate('donorId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Food posted successfully',
      data: food
    });

  } catch (error) {
    console.error('Create food error:', error);
    
    // Delete uploaded file if food creation fails
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create food post',
      error: error.message
    });
  }
};

// ========================================
// GET ALL AVAILABLE FOOD (For NGOs)
// ========================================
// GET /api/food
exports.getAllAvailableFood = async (req, res) => {
  try {
    // Find all food with status "Available"
    const foods = await Food.find({ status: 'Available' })
      .populate('donorId', 'name email')
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });

  } catch (error) {
    console.error('Get available food error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch food posts',
      error: error.message
    });
  }
};

// ========================================
// GET DONOR'S OWN FOOD POSTS
// ========================================
// GET /api/food/donor
exports.getDonorFood = async (req, res) => {
  try {
    // Find all food posted by current donor
    const foods = await Food.find({ donorId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });

  } catch (error) {
    console.error('Get donor food error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your food posts',
      error: error.message
    });
  }
};

// ========================================
// UPDATE FOOD POST (Only if Available)
// ========================================
// PUT /api/food/:id
exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, quantity, pickupLocation, latitude, longitude, category } = req.body;

    // Find food post
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food post not found'
      });
    }

    // Check if user is the owner
    if (food.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own posts'
      });
    }

    // Check if food is still available
    if (food.status !== 'Available') {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit food that has been assigned or completed'
      });
    }

    // Update fields
    if (title) food.title = title;
    if (description) food.description = description;
    if (quantity) food.quantity = quantity;
    if (pickupLocation) food.pickupLocation = pickupLocation;
    if (latitude) food.latitude = parseFloat(latitude);
    if (longitude) food.longitude = parseFloat(longitude);
    if (category) food.category = category;

    // If new image uploaded, delete old one and update
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads', food.imagePath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      food.imagePath = req.file.filename;
    }

    await food.save();

    res.status(200).json({
      success: true,
      message: 'Food post updated successfully',
      data: food
    });

  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update food post',
      error: error.message
    });
  }
};

// ========================================
// DELETE FOOD POST (Only if Available)
// ========================================
// DELETE /api/food/:id
exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Find food post
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food post not found'
      });
    }

    // Check if user is the owner
    if (food.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own posts'
      });
    }

    // Check if food is still available
    if (food.status !== 'Available') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete food that has been assigned or completed'
      });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '../uploads', food.imagePath);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete food post
    await Food.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Food post deleted successfully'
    });

  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete food post',
      error: error.message
    });
  }
};

// ========================================
// GET ALL FOOD POSTS (For Admin)
// ========================================
// GET /api/food/admin/all
exports.getAllFoodAdmin = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate('donorId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });

  } catch (error) {
    console.error('Get all food error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch food posts',
      error: error.message
    });
  }
};
