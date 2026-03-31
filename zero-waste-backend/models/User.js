// ========================================
// USER MODEL
// ========================================
// Defines the structure of User data in MongoDB

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },

  // Email address (must be unique)
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },

  // Password (will be hashed before saving)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },

  // User role determines access level
  role: {
    type: String,
    enum: ['Donor', 'NGO', 'Delivery Partner', 'Admin'],
    required: [true, 'Role is required']
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Export the model
module.exports = mongoose.model('User', userSchema);
