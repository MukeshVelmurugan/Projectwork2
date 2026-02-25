# 🌱 Zero Waste Food Redistribution System  
### Structured Sustainability Redistribution Platform

A full-stack web application that connects **food donors, NGOs, delivery partners, and administrators** to efficiently redistribute surplus food while minimizing waste. The system supports category-based sustainability allocation, delivery tracking, OTP verification, and analytics dashboards.

This project aims to transform surplus food into measurable social and environmental impact through a structured digital infrastructure.

---

## 🚀 Features

### 👤 Multi-Role System
- Donor
- NGO
- Delivery Partner
- Admin

Single unified dashboard with role-based functionality.

---

### 🍱 Food Redistribution Workflow
1. Donor posts surplus food.
2. NGO accepts available food.
3. Delivery task is automatically created.
4. Delivery partner accepts and starts delivery.
5. Live tracking is enabled.
6. OTP verification completes delivery.
7. System logs impact analytics.

---

### ♻️ Structured Sustainability Categories
Manual category selection during food posting:

- Human Consumption
- Cattle Feed
- Biogas / Compost

Category influences sustainability analytics and reporting.

---

### 🚚 Delivery Tracking System
- OpenStreetMap + Leaflet.js
- Browser Geolocation API
- Location updates every 20 seconds
- Map displayed inside dashboard card
- Manual tracking stop

---

### 🔐 OTP Delivery Verification
- Backend generates 4-digit OTP
- NGO views OTP
- Delivery partner confirms delivery using OTP
- Ensures secure delivery completion

---

### 📊 Admin Analytics Dashboard
Charts include:

- Total Users
- Total Food Posts
- Total Deliveries
- Category-wise Distribution
- NGOs Served

Built using Chart.js.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Leaflet.js (OpenStreetMap)
- Chart.js

### Backend
- Node.js
- Express.js
- JWT Authentication
- Mongoose

### Database
- MongoDB Atlas (Cloud)

### Other
- Geolocation API
- Local Image Upload Storage

---

## 📁 Project Structure

```
project-root/
│
├── client/                # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                # Node Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/MukeshVelmurugan/Projectwork2.git
cd zero-waste-system
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside **server** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔐 Security

- JWT Authentication
- Role-based Access Control
- Protected APIs
- Delivery partner authorization checks

---

## 🌍 Sustainable Development Goals (SDGs)

This project supports:

- SDG 2 – Zero Hunger
- SDG 9 – Industry, Innovation & Infrastructure
- SDG 12 – Responsible Consumption & Production
- SDG 17 – Partnerships for the Goals

---

## 📌 Future Improvements

- AI-based demand prediction
- Route optimization
- Mobile app integration
- Cloud storage integration
- Carbon footprint calculation

---

## 📄 License

This project is developed for educational purposes.

---
