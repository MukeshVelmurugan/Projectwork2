# 🌱 Zero Waste Food Redistribution System - Frontend

Beautiful, responsive React frontend for the Zero Waste Food Redistribution System.

---

## 🎨 Features

### ✅ User Features
- **User Authentication** (JWT-based)
- **Role-Based Dashboards** (Donor, NGO, Delivery Partner, Admin)
- **Responsive Design** (Works on desktop, tablet, mobile)
- **Modern UI** (Tailwind CSS)

### ✅ Donor Features
- Post food with image upload
- GPS location capture
- Category selection
- View & manage posts
- Delete available posts

### ✅ NGO Features
- Browse available food
- Accept food donations
- Real-time delivery tracking
- Interactive maps
- OTP management

### ✅ Delivery Partner Features
- View unassigned deliveries
- Accept delivery tasks
- Auto GPS tracking
- OTP-based completion

### ✅ Admin Features
- Analytics dashboard
- Interactive charts (Chart.js)
- User management
- System overview

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Chart.js + react-chartjs-2
- **Map Tiles**: OpenStreetMap

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DonorDashboard.jsx          # Donor interface
│   │   ├── NGODashboard.jsx            # NGO interface
│   │   ├── DeliveryPartnerDashboard.jsx # Partner interface
│   │   └── AdminDashboard.jsx          # Admin analytics
│   ├── Navbar.jsx                      # Navigation bar
│   ├── ProtectedRoute.jsx              # Route protection
│   └── TrackingMap.jsx                 # GPS tracking map
├── context/
│   └── AuthContext.jsx                 # Authentication state
├── pages/
│   ├── Login.jsx                       # Login page
│   ├── Register.jsx                    # Registration page
│   └── Dashboard.jsx                   # Main dashboard
├── config/
│   └── api.js                          # Axios configuration
├── App.jsx                             # Main app component
├── main.jsx                            # Entry point
└── index.css                           # Global styles
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm
- Backend running on `http://localhost:5000`

### Installation

```bash
# Navigate to frontend folder
cd zero-waste-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access
Open browser to: `http://localhost:5173`

---

## 📖 User Guide

### Login Credentials
```
Admin:
Email: admin@gmail.com
Password: 123456
```

### Register New Account
1. Click "Register here"
2. Choose role: Donor / NGO / Delivery Partner
3. Fill in details
4. Submit

---

## 🎯 Role-Specific Workflows

### **Donor Workflow**
1. Login as Donor
2. Click "+ Post Food"
3. Fill details & upload image
4. Click "Get My Location" for GPS
5. Submit food post
6. View in "My Food Posts"

### **NGO Workflow**
1. Login as NGO
2. Browse "Available Food"
3. Click "Accept Food"
4. View "My Deliveries"
5. Note OTP code
6. Track delivery on map

### **Delivery Partner Workflow**
1. Login as Delivery Partner
2. View "Available Tasks"
3. Click "Accept Delivery"
4. Click "Start Delivery"
5. GPS tracking starts automatically
6. Enter OTP to complete

### **Admin Workflow**
1. Login as Admin
2. View analytics dashboard
3. See charts & statistics
4. Manage users
5. View recent activities

---

## 📱 Responsive Design

Works on:
- 💻 Desktop (1920px+)
- 💻 Laptop (1024px+)
- 📱 Tablet (768px+)
- 📱 Mobile (375px+)

---

## 🗺️ Map Features

### Leaflet Integration
- Real-time GPS tracking
- OpenStreetMap tiles
- Custom markers (blue for partner, green for pickup)
- Auto-centering on location
- Updates every 20 seconds

### How It Works
1. Delivery partner clicks "Start Delivery"
2. Browser requests location permission
3. `navigator.geolocation.watchPosition()` starts
4. Location sent to backend every 20 seconds
5. NGO sees updates on map
6. Tracking stops when delivery completed

---

## 📊 Charts & Analytics

### Chart.js Features
- Pie charts (Users by Role, Deliveries by Status)
- Bar charts (Food by Category, Completed Deliveries)
- Responsive & interactive
- Color-coded categories

### Data Displayed
- Total users, food posts, deliveries
- Category distribution
- Status breakdown
- Recent activities table

---

## 🎨 UI/UX Features

### Design Principles
- Clean, modern interface
- Card-based layouts
- Consistent color scheme
- Clear visual hierarchy
- Intuitive navigation

### Color Palette
- Primary (Green): `#10b981` - Sustainability
- Secondary (Blue): `#3b82f6` - Trust
- Warning (Yellow): `#f59e0b` - Alerts
- Danger (Red): `#ef4444` - Errors
- Success (Light Green): `#22c55e` - Completion

### Components
- Buttons with hover effects
- Form inputs with focus states
- Status badges with color coding
- Loading spinners
- Error/Success messages

---

## 🔐 Authentication Flow

1. User registers → Token generated
2. Token stored in localStorage
3. Token sent with every API request
4. If 401 error → Auto logout → Redirect to login
5. Protected routes check authentication

---

## 🌐 API Integration

### Axios Configuration
- Base URL: `http://localhost:5000/api`
- Auto token attachment
- Global error handling
- Request/Response interceptors

### Example API Call
```javascript
// Get available food
const response = await api.get('/food');
setFoodPosts(response.data.data);
```

---

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

Output: `dist/` folder

---

## 🐛 Common Issues & Solutions

### Issue: Cannot connect to backend
**Solution:** Ensure backend is running on port 5000

### Issue: Map not loading
**Solution:** Check internet connection (OpenStreetMap requires internet)

### Issue: GPS not working
**Solution:** Allow location access in browser

### Issue: Charts not showing
**Solution:** Ensure there's data to display

See `SETUP_GUIDE.md` for detailed troubleshooting.

---

## 🔧 Environment Variables

No `.env` file needed! API URL is configured in:
```javascript
// src/config/api.js
const API_URL = 'http://localhost:5000/api';
```

To change backend URL, edit this file.

---

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🎓 Learning Resources

### React
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)

### Styling
- [Tailwind CSS](https://tailwindcss.com/)

### Maps
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)

### Charts
- [Chart.js](https://www.chartjs.org/)
- [react-chartjs-2](https://react-chartjs-2.js.org/)

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🎯 Key Components Explained

### AuthContext
Manages global authentication state. Provides:
- `user` - Current user object
- `login()` - Login function
- `logout()` - Logout function
- `register()` - Registration function

### ProtectedRoute
Wraps routes that require authentication. Redirects to login if not authenticated.

### TrackingMap
Displays real-time delivery partner location using Leaflet maps. Polls backend every 20 seconds.

### Dashboard
Main page that renders different components based on user role.

---

## ✨ Production Checklist

Before deploying:
- [ ] Update API URL in `src/config/api.js`
- [ ] Build production bundle: `npm run build`
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check all images load
- [ ] Test GPS tracking
- [ ] Test map loading
- [ ] Verify charts display correctly

---

## 📞 Support

For issues:
1. Check `SETUP_GUIDE.md`
2. Check browser console (F12)
3. Verify backend is running
4. Check network tab for API errors

---

## 🎉 Features Showcase

### For College Project Demo:

1. **Show clean, modern UI**
2. **Demonstrate all 4 user roles**
3. **Show real-time GPS tracking**
4. **Display interactive charts**
5. **Highlight responsive design**
6. **Show complete workflow** (Donor → NGO → Partner → Admin)

---

## 🏆 Project Highlights

- ✅ Full-stack React application
- ✅ Real-time GPS tracking
- ✅ Interactive maps & charts
- ✅ Role-based access control
- ✅ Modern, responsive UI
- ✅ Production-ready code
- ✅ Well-documented
- ✅ Beginner-friendly

---

## 📄 License

Educational/College Project

---

## 👨‍💻 Created By

**Your Name** - College Project 2024

---

**Happy Coding! 🚀**
