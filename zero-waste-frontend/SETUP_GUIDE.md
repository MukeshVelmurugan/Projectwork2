# 🎨 ZERO WASTE FRONTEND - SETUP GUIDE

## 📋 TABLE OF CONTENTS
1. Prerequisites
2. Installation Steps
3. Environment Configuration
4. Running the Frontend
5. Understanding the Structure
6. User Guide
7. Troubleshooting

---

## ✅ 1. PREREQUISITES

Make sure you have:

- ✅ **Backend running** on `http://localhost:5000`
  - If not, go back to backend folder and run `npm run dev`
  
- ✅ **Node.js** installed (v16 or higher)
  - Check: `node --version`
  
- ✅ **npm** installed
  - Check: `npm --version`

- ✅ **Modern Web Browser**
  - Chrome, Firefox, Edge, or Safari

---

## 💻 2. INSTALLATION STEPS

### Step 1: Navigate to Frontend Folder

Open your terminal/command prompt:

**Windows:**
```bash
cd C:\Users\YourName\Desktop\zero-waste-frontend
```

**Mac/Linux:**
```bash
cd ~/Desktop/zero-waste-frontend
```

### Step 2: Install Dependencies

Run this command (this will take 2-5 minutes):

```bash
npm install
```

**What this installs:**
- ✅ React - UI framework
- ✅ React Router - Page navigation
- ✅ Axios - HTTP requests
- ✅ Tailwind CSS - Styling
- ✅ Leaflet - Maps
- ✅ Chart.js - Analytics charts
- ✅ Vite - Development server

### Step 3: Wait for Installation

You should see:
```
added XXX packages in XXs
```

✅ **Installation complete!**

---

## ⚙️ 3. ENVIRONMENT CONFIGURATION

**Good news!** The frontend doesn't need a `.env` file. 

The API URL is hardcoded in `src/config/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

⚠️ **IMPORTANT**: Make sure backend is running on port 5000!

---

## 🚀 4. RUNNING THE FRONTEND

### Step 1: Start Development Server

In the terminal (inside zero-waste-frontend folder):

```bash
npm run dev
```

### Step 2: Verify It's Running

You should see:

```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 3: Open in Browser

- **Automatically**: Browser should open automatically
- **Manually**: Go to `http://localhost:5173/`

✅ **You should see the Login page!**

---

## 📁 5. UNDERSTANDING THE STRUCTURE

```
zero-waste-frontend/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── dashboard/      # Role-specific dashboards
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── NGODashboard.jsx
│   │   │   ├── DeliveryPartnerDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── TrackingMap.jsx
│   ├── context/            # Global state
│   │   └── AuthContext.jsx
│   ├── pages/              # Main pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── config/             # Configuration
│   │   └── api.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

---

## 👤 6. USER GUIDE

### **LOGIN PAGE**

1. Open `http://localhost:5173/`
2. You'll see the login form

**Demo Credentials:**
```
Admin:
Email: admin@gmail.com
Password: 123456
```

3. Click "Login"
4. You'll be redirected to Dashboard

---

### **REGISTER PAGE**

1. Click "Register here" link
2. Fill in the form:
   - Full Name
   - Email
   - Choose Role (Donor / NGO / Delivery Partner)
   - Password
   - Confirm Password
3. Click "Register"
4. You'll be auto-logged in

---

### **DONOR DASHBOARD**

**What you can do:**

1. **Post Food**
   - Click "+ Post Food" button
   - Fill in details:
     - Title (e.g., "Fresh Vegetables")
     - Description
     - Quantity (e.g., "10kg")
     - Category (Human Consumption / Cattle Feed / Biogas)
     - Pickup Location
     - GPS Coordinates (click "Get My Location" button)
     - Upload Image
   - Click "Post Food"

2. **View Your Posts**
   - See all your food posts
   - Delete posts (only if status is "Available")

---

### **NGO DASHBOARD**

**What you can do:**

1. **View Available Food**
   - Click "Available Food" tab
   - See all available food donations
   - Click "Accept Food" to accept

2. **Track Deliveries**
   - Click "My Deliveries" tab
   - See OTP code (give this to delivery partner)
   - Click "Track Delivery" when status is "In Progress"
   - View real-time location on map

---

### **DELIVERY PARTNER DASHBOARD**

**What you can do:**

1. **View Available Tasks**
   - Click "Available Tasks" tab
   - See unassigned delivery tasks
   - Click "Accept Delivery"

2. **Start Delivery**
   - Click "My Deliveries" tab
   - Click "Start Delivery" button
   - GPS tracking will start automatically
   - Your location updates every 20 seconds

3. **Complete Delivery**
   - Ask NGO for OTP code
   - Enter 4-digit OTP
   - Click "Complete Delivery"
   - GPS tracking stops automatically

---

### **ADMIN DASHBOARD**

**What you can do:**

1. **View Analytics**
   - See overview stats
   - View pie charts (Users by Role, Deliveries by Status)
   - View bar charts (Food by Category, Completed Deliveries)
   - See recent activities table

2. **Manage Users**
   - Click "Users" tab
   - View all registered users
   - See user roles and join dates

---

## 🔧 7. TROUBLESHOOTING

### ❌ Problem: "Cannot GET /api/..."

**Solution:** Backend is not running
1. Open new terminal
2. Go to backend folder
3. Run `npm run dev`

---

### ❌ Problem: "Network Error" or "ERR_CONNECTION_REFUSED"

**Solutions:**

1. **Check if backend is running:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK"}`

2. **Check ports:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

3. **Restart both servers**

---

### ❌ Problem: "npm install" fails

**Solutions:**

1. **Delete node_modules and try again:**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Check Node version:**
   ```bash
   node --version
   ```
   Must be v16 or higher

---

### ❌ Problem: Map not showing

**Solutions:**

1. **Check internet connection** (Leaflet needs to load tiles from OpenStreetMap)

2. **Check browser console** (F12 → Console tab)

3. **Make sure GPS coordinates are valid**
   - Latitude: -90 to 90
   - Longitude: -180 to 180

---

### ❌ Problem: GPS tracking not working

**Solutions:**

1. **Allow location access in browser**
   - Chrome: Click lock icon → Location → Allow
   
2. **Use HTTPS or localhost** (browsers block geolocation on HTTP)

3. **Check if browser supports geolocation:**
   - Modern browsers do (Chrome, Firefox, Safari, Edge)

---

### ❌ Problem: Images not showing

**Solutions:**

1. **Check backend uploads folder exists:**
   ```
   zero-waste-backend/uploads/
   ```

2. **Check image URL in browser:**
   ```
   http://localhost:5000/uploads/filename.jpg
   ```

3. **Make sure backend is serving static files**

---

### ❌ Problem: "Cannot read property 'role' of null"

**Solution:** You're not logged in
1. Go to `/login`
2. Login again
3. Check if token is stored: 
   - F12 → Application → Local Storage → `token`

---

### ❌ Problem: Charts not showing

**Solutions:**

1. **Check if there's data:**
   - Admin needs data to show charts
   - Create some food posts and deliveries first

2. **Check browser console for errors**

3. **Refresh the page**

---

### ❌ Problem: Port 5173 already in use

**Solution:**

1. **Kill the process:**
   
   **Windows:**
   ```bash
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

   **Mac/Linux:**
   ```bash
   lsof -ti:5173 | xargs kill -9
   ```

2. **Or change port in vite.config.js:**
   ```javascript
   server: {
     port: 5174  // Change to any free port
   }
   ```

---

## 🎯 COMPLETE WORKFLOW EXAMPLE

### **Test the Complete System:**

1. **Start Backend**
   ```bash
   cd zero-waste-backend
   npm run dev
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd zero-waste-frontend
   npm run dev
   ```

3. **Login as Admin**
   - Email: `admin@gmail.com`
   - Password: `123456`
   - View analytics (should be empty initially)

4. **Register as Donor** (new browser tab/incognito)
   - Register with email: `donor@test.com`
   - Role: Donor
   - Password: `123456`

5. **Post Food**
   - Title: "Fresh Vegetables"
   - Description: "10kg fresh vegetables"
   - Quantity: "10kg"
   - Category: "Human Consumption"
   - Location: "123 Main St"
   - Click "Get My Location"
   - Upload any image
   - Submit

6. **Register as NGO** (new tab)
   - Email: `ngo@test.com`
   - Role: NGO
   - Password: `123456`

7. **Accept Food**
   - View available food
   - Accept the vegetables
   - Note the OTP code

8. **Register as Delivery Partner** (new tab)
   - Email: `partner@test.com`
   - Role: Delivery Partner
   - Password: `123456`

9. **Accept & Start Delivery**
   - View available tasks
   - Accept delivery
   - Click "Start Delivery"
   - Allow location access

10. **Track Delivery** (NGO tab)
    - Click "My Deliveries"
    - Click "Track Delivery"
    - See partner's location on map (updates every 20 seconds)

11. **Complete Delivery** (Partner tab)
    - Enter OTP from NGO
    - Click "Complete Delivery"

12. **View Analytics** (Admin tab)
    - Refresh dashboard
    - See charts updated
    - View recent activities

✅ **Congratulations! Your system is fully working!**

---

## 📊 FEATURES CHECKLIST

- [x] User Registration & Login
- [x] JWT Authentication
- [x] Role-based Dashboards
- [x] Food Posting with Images
- [x] Category-based Classification
- [x] GPS Location Capture
- [x] NGO Food Acceptance
- [x] Delivery Task Creation
- [x] OTP Generation
- [x] Delivery Partner Assignment
- [x] Real-time GPS Tracking
- [x] OTP-based Completion
- [x] Interactive Maps (Leaflet)
- [x] Admin Analytics (Chart.js)
- [x] Responsive Design
- [x] Clean UI (Tailwind CSS)

---

## 🎓 LEARNING TIPS

### Understanding React Components:

1. **Pages** = Full screens (Login, Register, Dashboard)
2. **Components** = Reusable pieces (Navbar, Cards)
3. **Context** = Global state (User authentication)

### Understanding React Router:

- `/login` → Shows Login page
- `/register` → Shows Register page  
- `/dashboard` → Shows Dashboard (protected)

### Understanding Axios:

- `api.get()` → Fetch data
- `api.post()` → Send data
- `api.put()` → Update data
- `api.delete()` → Delete data

### Understanding Leaflet:

- `MapContainer` → Creates map
- `TileLayer` → Loads map tiles
- `Marker` → Shows location pins
- `Popup` → Info when clicking markers

---

## 📞 NEED HELP?

1. Check error in browser console (F12)
2. Check error in backend terminal
3. Read this troubleshooting section
4. Google the error message
5. Check if backend is running
6. Check if data exists (create some test data)

---

## ✨ TIPS FOR DEMO

### Before Presenting:

1. ✅ Create sample data (3-5 food posts, 2-3 deliveries)
2. ✅ Test complete workflow once
3. ✅ Open multiple browser tabs for different roles
4. ✅ Clear browser cache if needed
5. ✅ Check internet connection (for maps)

### During Demo:

1. Start with Admin analytics
2. Show donor posting food
3. Show NGO accepting
4. Show partner accepting & tracking
5. Show live map tracking
6. Complete delivery with OTP
7. Show updated analytics

---

**🎉 YOUR FRONTEND IS READY!**

Both backend and frontend are now complete and working together!
