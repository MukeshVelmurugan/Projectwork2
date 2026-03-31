// ========================================
// DELIVERY CONTROLLER
// ========================================
// Handles delivery task creation, assignment, tracking, and completion

const Delivery = require('../models/Delivery');
const Food = require('../models/Food');

// ========================================
// HELPER: Generate 4-digit OTP
// ========================================
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// ========================================
// NGO ACCEPTS FOOD (Creates Delivery Task)
// ========================================
// POST /api/delivery/accept-food/:foodId
exports.acceptFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    // Find food post
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food post not found'
      });
    }

    // Check if food is available
    if (food.status !== 'Available') {
      return res.status(400).json({
        success: false,
        message: 'This food has already been accepted'
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Create delivery task
    const delivery = await Delivery.create({
      foodId: food._id,
      donorId: food.donorId,
      ngoId: req.user._id,
      deliveryPartnerId: null, // Unassigned initially
      status: 'Unassigned',
      otp: otp
    });

    // Update food status to Assigned
    food.status = 'Assigned';
    await food.save();

    // Populate details for response
    await delivery.populate([
      { path: 'foodId' },
      { path: 'donorId', select: 'name email' },
      { path: 'ngoId', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Food accepted successfully. Delivery task created.',
      data: delivery
    });

  } catch (error) {
    console.error('Accept food error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept food',
      error: error.message
    });
  }
};

// ========================================
// GET NGO'S ACCEPTED DELIVERIES
// ========================================
// GET /api/delivery/ngo
exports.getNGODeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ ngoId: req.user._id })
      .populate('foodId')
      .populate('donorId', 'name email')
      .populate('ngoId', 'name email')
      .populate('deliveryPartnerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries
    });

  } catch (error) {
    console.error('Get NGO deliveries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deliveries',
      error: error.message
    });
  }
};

// ========================================
// GET UNASSIGNED DELIVERY TASKS (For Delivery Partners)
// ========================================
// GET /api/delivery/unassigned
exports.getUnassignedDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ 
      status: 'Unassigned',
      deliveryPartnerId: null 
    })
      .populate('foodId')
      .populate('donorId', 'name email')
      .populate('ngoId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries
    });

  } catch (error) {
    console.error('Get unassigned deliveries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch unassigned deliveries',
      error: error.message
    });
  }
};

// ========================================
// DELIVERY PARTNER ACCEPTS DELIVERY TASK
// ========================================
// POST /api/delivery/accept/:id
exports.acceptDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    // Find delivery
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery task not found'
      });
    }

    // Check if already assigned
    if (delivery.status !== 'Unassigned' || delivery.deliveryPartnerId !== null) {
      return res.status(400).json({
        success: false,
        message: 'This delivery has already been assigned'
      });
    }

    // Assign to current delivery partner
    delivery.deliveryPartnerId = req.user._id;
    delivery.status = 'Assigned';
    await delivery.save();

    // Populate details
    await delivery.populate([
      { path: 'foodId' },
      { path: 'donorId', select: 'name email' },
      { path: 'ngoId', select: 'name email' },
      { path: 'deliveryPartnerId', select: 'name email' }
    ]);

    res.status(200).json({
      success: true,
      message: 'Delivery accepted successfully',
      data: delivery
    });

  } catch (error) {
    console.error('Accept delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept delivery',
      error: error.message
    });
  }
};

// ========================================
// START DELIVERY (Changes status to In Progress)
// ========================================
// POST /api/delivery/start/:id
exports.startDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    // Find delivery
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery task not found'
      });
    }

    // Check if delivery partner is assigned to this delivery
    if (delivery.deliveryPartnerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not assigned to this delivery'
      });
    }

    // Check if delivery is in correct state
    if (delivery.status !== 'Assigned') {
      return res.status(400).json({
        success: false,
        message: 'Delivery cannot be started'
      });
    }

    // Update status
    delivery.status = 'In Progress';
    await delivery.save();

    res.status(200).json({
      success: true,
      message: 'Delivery started successfully',
      data: delivery
    });

  } catch (error) {
    console.error('Start delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start delivery',
      error: error.message
    });
  }
};

// ========================================
// UPDATE DELIVERY LOCATION (GPS Tracking)
// ========================================
// POST /api/delivery/update-location/:id
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    // Validate coordinates
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude'
      });
    }

    // Find delivery
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery task not found'
      });
    }

    // Check if delivery partner is assigned to this delivery
    if (delivery.deliveryPartnerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not assigned to this delivery'
      });
    }

    // Check if delivery is in progress
    if (delivery.status !== 'In Progress') {
      return res.status(400).json({
        success: false,
        message: 'Delivery is not in progress'
      });
    }

    // Update location
    delivery.currentLat = parseFloat(latitude);
    delivery.currentLng = parseFloat(longitude);
    await delivery.save();

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      data: {
        currentLat: delivery.currentLat,
        currentLng: delivery.currentLng
      }
    });

  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update location',
      error: error.message
    });
  }
};

// ========================================
// COMPLETE DELIVERY (Verify OTP)
// ========================================
// POST /api/delivery/complete/:id
exports.completeDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    // Validate OTP
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide OTP'
      });
    }

    // Find delivery
    const delivery = await Delivery.findById(id)
      .populate('foodId');

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery task not found'
      });
    }

    // Check if delivery partner is assigned to this delivery
    if (delivery.deliveryPartnerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not assigned to this delivery'
      });
    }

    // Check if delivery is in progress
    if (delivery.status !== 'In Progress') {
      return res.status(400).json({
        success: false,
        message: 'Delivery is not in progress'
      });
    }

    // Verify OTP
    if (otp !== delivery.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Update delivery status
    delivery.status = 'Completed';
    delivery.completedAt = new Date();
    await delivery.save();

    // Update food status
    const food = await Food.findById(delivery.foodId);
    food.status = 'Completed';
    await food.save();

    res.status(200).json({
      success: true,
      message: 'Delivery completed successfully',
      data: delivery
    });

  } catch (error) {
    console.error('Complete delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete delivery',
      error: error.message
    });
  }
};

// ========================================
// GET DELIVERY PARTNER'S DELIVERIES
// ========================================
// GET /api/delivery/partner
exports.getPartnerDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ deliveryPartnerId: req.user._id })
      .populate('foodId')
      .populate('donorId', 'name email')
      .populate('ngoId', 'name email')
      .populate('deliveryPartnerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries
    });

  } catch (error) {
    console.error('Get partner deliveries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deliveries',
      error: error.message
    });
  }
};

// ========================================
// GET ALL DELIVERIES (For Admin)
// ========================================
// GET /api/delivery/admin/all
exports.getAllDeliveriesAdmin = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate('foodId')
      .populate('donorId', 'name email')
      .populate('ngoId', 'name email')
      .populate('deliveryPartnerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries
    });

  } catch (error) {
    console.error('Get all deliveries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deliveries',
      error: error.message
    });
  }
};

// ========================================
// GET SINGLE DELIVERY (For Tracking)
// ========================================
// GET /api/delivery/:id
exports.getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id)
      .populate('foodId')
      .populate('donorId', 'name email')
      .populate('ngoId', 'name email')
      .populate('deliveryPartnerId', 'name email');

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    res.status(200).json({
      success: true,
      data: delivery
    });

  } catch (error) {
    console.error('Get delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delivery',
      error: error.message
    });
  }
};
