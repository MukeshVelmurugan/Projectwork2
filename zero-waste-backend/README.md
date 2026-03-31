# 🌱 Zero Waste Food Redistribution System - Backend

A structured sustainability redistribution platform connecting Donors, NGOs, Delivery Partners, and Admins to reduce food waste.

---

## 📚 Project Overview

This is the **backend API** for the Zero Waste Food Redistribution System. It provides:

- **User Authentication** (JWT-based)
- **Role-Based Access Control** (Donor, NGO, Delivery Partner, Admin)
- **Food Posting & Management**
- **Delivery Task Creation & Tracking**
- **Real-time GPS Location Updates**
- **OTP-based Delivery Completion**
- **Admin Analytics Dashboard**

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Password Hashing**: Crypto (SHA-256)
- **CORS**: Enabled for frontend communication

---

## 📁 Project Structure

```
zero-waste-backend/
├── models/
│   ├── User.js              # User schema (Donor, NGO, Partner, Admin)
│   ├── Food.js              # Food post schema
│   └── Delivery.js          # Delivery task schema
├── controllers/
│   ├── authController.js    # Registration, Login, Profile
│   ├── foodController.js    # Food CRUD operations
│   ├── deliveryController.js # Delivery workflow
│   └── adminController.js   # User management & analytics
├── routes/
│   ├── authRoutes.js        # /api/auth routes
│   ├── foodRoutes.js        # /api/food routes
│   ├── deliveryRoutes.js    # /api/delivery routes
│   └── adminRoutes.js       # /api/admin routes
├── middleware/
│   ├── auth.js              # JWT verification & role authorization
│   └── upload.js            # Multer file upload configuration
├── uploads/                 # Uploaded images storage
├── server.js                # Main entry point
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── SETUP_GUIDE.md           # Complete setup instructions
├── API_DOCUMENTATION.md     # API endpoints reference
└── README.md                # This file
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm

### Installation

1. **Navigate to backend folder:**
   ```bash
   cd zero-waste-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env`:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/zero-waste
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

5. **Start server:**
   ```bash
   npm run dev
   ```

6. **Verify:**
   Open browser: `http://localhost:5000/api/health`

---

## 🔐 Authentication

### Password Hashing
- Uses SHA-256 for demo purposes
- Production should use bcrypt

### JWT Token
- Expires in 7 days
- Sent in `Authorization: Bearer <token>` header

### Roles
- **Donor**: Post food, manage own posts
- **NGO**: View available food, accept deliveries
- **Delivery Partner**: Accept tasks, track deliveries
- **Admin**: Full system access, analytics

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Food (Donor)
- `POST /api/food` - Create food post
- `GET /api/food/donor` - Get own posts
- `PUT /api/food/:id` - Update food
- `DELETE /api/food/:id` - Delete food

### Food (NGO)
- `GET /api/food` - Get available food

### Delivery (NGO)
- `POST /api/delivery/accept-food/:foodId` - Accept food
- `GET /api/delivery/ngo` - Get NGO deliveries

### Delivery (Partner)
- `GET /api/delivery/unassigned` - Get unassigned tasks
- `POST /api/delivery/accept/:id` - Accept delivery
- `POST /api/delivery/start/:id` - Start delivery
- `POST /api/delivery/update-location/:id` - Update GPS location
- `POST /api/delivery/complete/:id` - Complete with OTP
- `GET /api/delivery/partner` - Get partner deliveries

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/analytics` - Get analytics data
- `DELETE /api/admin/users/:id` - Delete user

**Full API Documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🗄️ Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Donor/NGO/Delivery Partner/Admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Food
```javascript
{
  title: String,
  description: String,
  quantity: String,
  pickupLocation: String,
  latitude: Number,
  longitude: Number,
  imagePath: String,
  category: String (Human Consumption/Cattle Feed/Biogas),
  status: String (Available/Assigned/Completed),
  donorId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Delivery
```javascript
{
  foodId: ObjectId (ref: Food),
  donorId: ObjectId (ref: User),
  ngoId: ObjectId (ref: User),
  deliveryPartnerId: ObjectId (ref: User),
  status: String (Unassigned/Assigned/In Progress/Completed),
  currentLat: Number,
  currentLng: Number,
  otp: String (4 digits),
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Features

### ✅ Implemented
- User registration & authentication
- Role-based access control
- Food posting with image upload
- Category-based food classification
- NGO food acceptance
- Delivery task creation with OTP
- First-come-first-serve delivery assignment
- Real-time GPS tracking
- OTP-based delivery completion
- Admin analytics dashboard
- CRUD operations for food posts

### 🔄 Workflow
1. **Donor** posts food with category
2. **NGO** accepts food → Delivery task created with OTP
3. **Delivery Partner** accepts task
4. **Delivery Partner** starts delivery → GPS tracking begins
5. **Delivery Partner** enters OTP → Delivery completed

---

## 🖼️ Image Upload

- **Storage**: Local `/uploads` folder
- **Formats**: .jpg, .jpeg, .png
- **Max Size**: 5MB
- **Access**: `http://localhost:5000/uploads/filename.jpg`

---

## 📊 Analytics

Admin dashboard provides:
- Total users by role
- Total food posts by category
- Total deliveries by status
- Completed deliveries by category
- Recent activities

---

## 🔧 Development

### Start Development Server
```bash
npm run dev
```
Uses nodemon for auto-restart on file changes.

### Start Production Server
```bash
npm start
```

---

## 🧪 Testing

### Using Postman
1. Import collection from `API_DOCUMENTATION.md`
2. Set environment variable: `baseUrl = http://localhost:5000/api`
3. Test endpoints

### Manual Testing
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed testing instructions.

---

## 🔒 Security

- JWT token expiration
- Role-based middleware
- Input validation
- File type & size restrictions
- CORS configuration
- Password hashing

**⚠️ Note**: This is a demo project. For production:
- Use bcrypt for password hashing
- Add rate limiting
- Implement refresh tokens
- Use HTTPS
- Add input sanitization
- Implement logging

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed:**
- Check if MongoDB is running
- Verify MONGODB_URI in `.env`

**Port Already in Use:**
- Change PORT in `.env`
- Or kill the process on port 5000

**Cannot Upload Images:**
- Check if `uploads/` folder exists
- Verify file permissions

**JWT Token Invalid:**
- Check token format: `Bearer <token>`
- Verify JWT_SECRET in `.env`

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting.

---

## 📖 Documentation

- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **API Documentation**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 👥 User Roles & Permissions

| Feature | Donor | NGO | Delivery Partner | Admin |
|---------|-------|-----|------------------|-------|
| Register/Login | ✅ | ✅ | ✅ | ✅ |
| Post Food | ✅ | ❌ | ❌ | ❌ |
| View Available Food | ❌ | ✅ | ❌ | ✅ |
| Accept Food | ❌ | ✅ | ❌ | ❌ |
| Accept Delivery | ❌ | ❌ | ✅ | ❌ |
| Track Delivery | ❌ | ✅ | ✅ | ✅ |
| Complete Delivery | ❌ | ❌ | ✅ | ❌ |
| View Analytics | ❌ | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |

---

## 📝 License

This is a college project for educational purposes.

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)

---

## ✨ Created By

**Your Name** - College Project 2024

---

## 📞 Support

For issues and questions:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Check error logs in terminal
4. Google the error message

---

**Happy Coding! 🚀**
