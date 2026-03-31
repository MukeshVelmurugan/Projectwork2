# 🚀 ZERO WASTE FOOD REDISTRIBUTION SYSTEM - BACKEND SETUP GUIDE

## 📋 TABLE OF CONTENTS
1. Prerequisites
2. MongoDB Setup (Local & Atlas)
3. Backend Installation
4. Environment Configuration
5. Creating Admin User
6. Running the Backend
7. Testing API Endpoints
8. Troubleshooting

---

## ✅ 1. PREREQUISITES

Before starting, make sure you have installed:

- **Node.js** (v16 or higher)
  - Download: https://nodejs.org/
  - Check version: `node --version`
  
- **npm** (comes with Node.js)
  - Check version: `npm --version`

- **MongoDB** (Choose ONE option):
  - **Option A**: MongoDB Compass (Local - Easier for beginners)
  - **Option B**: MongoDB Atlas (Cloud - Free tier)

- **Git** (Optional, for version control)
  - Download: https://git-scm.com/

- **Postman** (Optional, for testing API)
  - Download: https://www.postman.com/

---

## 🗄️ 2. MONGODB SETUP

### **OPTION A: MongoDB Compass (LOCAL) - RECOMMENDED FOR BEGINNERS**

#### Step 1: Download MongoDB Compass
- Go to: https://www.mongodb.com/try/download/compass
- Download Community Edition
- Install following the wizard

#### Step 2: Start MongoDB Compass
1. Open MongoDB Compass
2. Connection string will be: `mongodb://localhost:27017`
3. Click "Connect"

#### Step 3: Create Database
1. Click "Create Database" button
2. Database Name: `zero-waste`
3. Collection Name: `users` (we'll create more later)
4. Click "Create Database"

✅ **Your MongoDB URI**: `mongodb://localhost:27017/zero-waste`

---

### **OPTION B: MongoDB Atlas (CLOUD)**

#### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (it's free)
3. Verify your email

#### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select cloud provider and region (choose closest to you)
4. Cluster Name: `ZeroWasteCluster`
5. Click "Create"

#### Step 3: Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `admin`
4. Password: `admin123` (or create your own - REMEMBER THIS!)
5. User Privileges: "Read and write to any database"
6. Click "Add User"

#### Step 4: Whitelist Your IP
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

#### Step 5: Get Connection String
1. Go back to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Click "Connect your application"
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://admin:<password>@zeroWastecluster.xxxxx.mongodb.net/
   ```
5. Replace `<password>` with your actual password
6. Add database name at the end: `zero-waste`

✅ **Your MongoDB URI**: 
```
mongodb+srv://admin:admin123@zerowastecluster.xxxxx.mongodb.net/zero-waste
```

---

## 💻 3. BACKEND INSTALLATION

### Step 1: Navigate to Backend Folder
Open your terminal/command prompt and navigate to the backend folder:

```bash
cd path/to/zero-waste-backend
```

**Windows Example:**
```bash
cd C:\Users\YourName\Desktop\zero-waste-backend
```

**Mac/Linux Example:**
```bash
cd ~/Desktop/zero-waste-backend
```

### Step 2: Install Dependencies
Run this command to install all required packages:

```bash
npm install
```

This will install:
- express (Web framework)
- mongoose (MongoDB driver)
- cors (Cross-origin resource sharing)
- dotenv (Environment variables)
- jsonwebtoken (JWT authentication)
- multer (File uploads)
- nodemon (Auto-restart server during development)

**Wait for installation to complete** (may take 2-5 minutes)

✅ You should see: "added XXX packages"

---

## ⚙️ 4. ENVIRONMENT CONFIGURATION

### Step 1: Create .env File
In the `zero-waste-backend` folder, create a file named `.env` (no extension)

**Windows:** Right-click → New → Text Document → Rename to `.env`
**Mac/Linux:** Use text editor or run: `touch .env`

### Step 2: Copy Configuration
Open the `.env` file and paste this (choose your MongoDB option):

#### FOR LOCAL MONGODB:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zero-waste
JWT_SECRET=my-super-secret-key-for-college-project-2024
NODE_ENV=development
```

#### FOR MONGODB ATLAS:
```env
PORT=5000
MONGODB_URI=mongodb+srv://admin:admin123@zerowastecluster.xxxxx.mongodb.net/zero-waste
JWT_SECRET=my-super-secret-key-for-college-project-2024
NODE_ENV=development
```

⚠️ **IMPORTANT**: Replace the MongoDB URI with YOUR actual connection string!

### Step 3: Save the File
Make sure the file is saved as `.env` (not `.env.txt`)

---

## 👤 5. CREATING ADMIN USER

You need to create an Admin user manually in MongoDB.

### **METHOD 1: Using MongoDB Compass (LOCAL)**

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Click on database: `zero-waste`
4. Click on collection: `users`
5. Click "Add Data" → "Insert Document"
6. Paste this JSON:

```json
{
  "name": "Admin User",
  "email": "admin@gmail.com",
  "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
  "role": "Admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

7. Click "Insert"

✅ **Admin Login Credentials:**
- Email: `admin@gmail.com`
- Password: `123456`

---

### **METHOD 2: Using MongoDB Atlas (CLOUD)**

1. Go to MongoDB Atlas website
2. Click "Browse Collections"
3. Find database: `zero-waste`
4. If no collections exist, create one: `users`
5. Click "Insert Document"
6. Paste the same JSON as above
7. Click "Insert"

✅ **Admin Login Credentials:**
- Email: `admin@gmail.com`
- Password: `123456`

---

### **METHOD 3: Using Mongo Shell (ADVANCED)**

If you have mongo shell installed:

```bash
mongosh "mongodb://localhost:27017/zero-waste"
```

Then run:

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@gmail.com",
  password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
  role: "Admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 🎯 6. RUNNING THE BACKEND

### Step 1: Start the Server

In your terminal (inside zero-waste-backend folder):

```bash
npm run dev
```

### Step 2: Verify Server is Running

You should see:

```
========================================
🚀 Server running on port 5000
📡 API: http://localhost:5000/api
🖼️  Images: http://localhost:5000/uploads
========================================
✅ Connected to MongoDB successfully
```

### Step 3: Test Health Check

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Zero Waste Food Redistribution Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

✅ **Backend is running successfully!**

---

## 🧪 7. TESTING API ENDPOINTS

### Using Browser (Simple GET requests only)

Test these URLs in your browser:

1. **Health Check:**
   ```
   http://localhost:5000/api/health
   ```

---

### Using Postman (Recommended for full testing)

#### Test 1: Register a Donor

- Method: `POST`
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "donor@gmail.com",
  "password": "123456",
  "role": "Donor"
}
```
- Click "Send"
- You should get a token in response

---

#### Test 2: Login as Admin

- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```
- Click "Send"
- **COPY THE TOKEN** from response (you'll need it)

---

#### Test 3: Get Current User (Protected Route)

- Method: `GET`
- URL: `http://localhost:5000/api/auth/me`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN_HERE` (paste the token you copied)
- Click "Send"
- You should see your user data

---

## 🆘 8. TROUBLESHOOTING

### ❌ Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` again

---

### ❌ Problem: "MongoDB connection error"
**Solution:** 
1. Check if MongoDB Compass is running (for local)
2. Check your MONGODB_URI in .env file
3. For Atlas: Check username/password, whitelist IP

---

### ❌ Problem: "Port 5000 is already in use"
**Solution:** 
1. Change PORT in .env to 5001
2. Or kill the process using port 5000

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

---

### ❌ Problem: "Cannot POST /api/auth/register"
**Solution:** Make sure server is running (`npm run dev`)

---

### ❌ Problem: Uploaded images not showing
**Solution:** 
1. Check if `uploads` folder exists
2. Images are accessible at: `http://localhost:5000/uploads/filename.jpg`

---

### ❌ Problem: "JWT malformed"
**Solution:** 
1. Make sure you're sending token as: `Bearer YOUR_TOKEN`
2. Check Authorization header format

---

## 📚 QUICK REFERENCE

### All API Endpoints:

```
AUTH:
POST   /api/auth/register          - Register user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user

FOOD:
POST   /api/food                   - Create food (Donor)
GET    /api/food                   - Get available food (NGO)
GET    /api/food/donor             - Get own posts (Donor)
PUT    /api/food/:id               - Update food (Donor)
DELETE /api/food/:id               - Delete food (Donor)
GET    /api/food/admin/all         - Get all food (Admin)

DELIVERY:
POST   /api/delivery/accept-food/:foodId     - Accept food (NGO)
GET    /api/delivery/ngo                     - Get NGO deliveries
GET    /api/delivery/unassigned              - Get unassigned (Partner)
POST   /api/delivery/accept/:id              - Accept delivery (Partner)
POST   /api/delivery/start/:id               - Start delivery (Partner)
POST   /api/delivery/update-location/:id     - Update location (Partner)
POST   /api/delivery/complete/:id            - Complete delivery (Partner)
GET    /api/delivery/partner                 - Get partner deliveries
GET    /api/delivery/:id                     - Get single delivery
GET    /api/delivery/admin/all               - Get all deliveries (Admin)

ADMIN:
GET    /api/admin/users            - Get all users
GET    /api/admin/analytics        - Get analytics
DELETE /api/admin/users/:id        - Delete user
```

---

## ✅ CHECKLIST BEFORE MOVING TO FRONTEND

- [ ] Node.js and npm installed
- [ ] MongoDB running (Compass or Atlas)
- [ ] Backend dependencies installed (`npm install`)
- [ ] .env file created and configured
- [ ] Admin user created in database
- [ ] Backend server running (`npm run dev`)
- [ ] Health check endpoint working
- [ ] Test registration/login working

---

## 🎓 UNDERSTANDING THE BACKEND

### Folder Structure:
```
zero-waste-backend/
├── models/              # Database schemas (User, Food, Delivery)
├── controllers/         # Business logic
├── routes/             # API endpoints
├── middleware/         # Auth & file upload
├── uploads/            # Uploaded images
├── server.js           # Main entry point
├── package.json        # Dependencies
└── .env               # Configuration
```

### How Authentication Works:
1. User registers → Password hashed → Saved to database
2. User logs in → Password verified → JWT token generated
3. User makes request → Token sent in header → Verified → Access granted

### How File Upload Works:
1. Donor uploads image via form
2. Multer middleware processes it
3. File saved to `/uploads` folder
4. Filename saved to database
5. Image accessible at: `http://localhost:5000/uploads/filename.jpg`

---

## 📞 NEED HELP?

If you get stuck:
1. Check the error message in terminal
2. Look for the error in this troubleshooting section
3. Google the error message
4. Check MongoDB connection
5. Verify .env file configuration

---

**🎉 CONGRATULATIONS!** 
Your backend is ready! Next step: Frontend setup.
