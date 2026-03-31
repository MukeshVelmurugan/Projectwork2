// ========================================
// ADMIN CONTROLLER
// ========================================
// Handles admin analytics and user management

const User = require('../models/User');
const Food = require('../models/Food');
const Delivery = require('../models/Delivery');

// ========================================
// GET ALL USERS
// ========================================
// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 });

    // Count by role
    const roleCount = {
      Donor: 0,
      NGO: 0,
      'Delivery Partner': 0,
      Admin: 0
    };

    users.forEach(user => {
      roleCount[user.role]++;
    });

    res.status(200).json({
      success: true,
      count: users.length,
      roleCount: roleCount,
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// ========================================
// GET ANALYTICS DATA
// ========================================
// GET /api/admin/analytics
exports.getAnalytics = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalFood = await Food.countDocuments();
    const totalDeliveries = await Delivery.countDocuments();
    const completedDeliveries = await Delivery.countDocuments({ status: 'Completed' });

    // Count users by role
    const donors = await User.countDocuments({ role: 'Donor' });
    const ngos = await User.countDocuments({ role: 'NGO' });
    const deliveryPartners = await User.countDocuments({ role: 'Delivery Partner' });
    const admins = await User.countDocuments({ role: 'Admin' });

    // Count food by category
    const humanConsumption = await Food.countDocuments({ category: 'Human Consumption' });
    const cattleFeed = await Food.countDocuments({ category: 'Cattle Feed' });
    const biogas = await Food.countDocuments({ category: 'Biogas / Compost' });

    // Count food by status
    const availableFood = await Food.countDocuments({ status: 'Available' });
    const assignedFood = await Food.countDocuments({ status: 'Assigned' });
    const completedFood = await Food.countDocuments({ status: 'Completed' });

    // Count deliveries by status
    const unassignedDeliveries = await Delivery.countDocuments({ status: 'Unassigned' });
    const assignedDeliveries = await Delivery.countDocuments({ status: 'Assigned' });
    const inProgressDeliveries = await Delivery.countDocuments({ status: 'In Progress' });

    // Category-wise completed deliveries
    const completedDeliveriesData = await Delivery.find({ status: 'Completed' })
      .populate('foodId', 'category');

    let completedHumanConsumption = 0;
    let completedCattleFeed = 0;
    let completedBiogas = 0;

    completedDeliveriesData.forEach(delivery => {
      if (delivery.foodId) {
        if (delivery.foodId.category === 'Human Consumption') completedHumanConsumption++;
        if (delivery.foodId.category === 'Cattle Feed') completedCattleFeed++;
        if (delivery.foodId.category === 'Biogas / Compost') completedBiogas++;
      }
    });

    // Recent activities (last 10 deliveries)
    const recentDeliveries = await Delivery.find()
      .populate('foodId', 'title category')
      .populate('donorId', 'name')
      .populate('ngoId', 'name')
      .populate('deliveryPartnerId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalFood,
          totalDeliveries,
          completedDeliveries
        },
        usersByRole: {
          donors,
          ngos,
          deliveryPartners,
          admins
        },
        foodByCategory: {
          humanConsumption,
          cattleFeed,
          biogas
        },
        foodByStatus: {
          available: availableFood,
          assigned: assignedFood,
          completed: completedFood
        },
        deliveriesByStatus: {
          unassigned: unassignedDeliveries,
          assigned: assignedDeliveries,
          inProgress: inProgressDeliveries,
          completed: completedDeliveries
        },
        completedDeliveriesByCategory: {
          humanConsumption: completedHumanConsumption,
          cattleFeed: completedCattleFeed,
          biogas: completedBiogas
        },
        recentActivities: recentDeliveries
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
};

// ========================================
// DELETE USER (Optional feature)
// ========================================
// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};
