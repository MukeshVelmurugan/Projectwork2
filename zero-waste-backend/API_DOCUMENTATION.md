# 📡 API DOCUMENTATION

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "123456",
  "role": "Donor"
}
```

**Roles:** `Donor` | `NGO` | `Delivery Partner` | `Admin`

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64abc123...",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "Donor"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64abc123...",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "Donor"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64abc123...",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "Donor"
    }
  }
}
```

---

## 🍎 FOOD ENDPOINTS

### 1. Create Food Post (Donor Only)
**POST** `/food`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title`: String (required)
- `description`: String (required)
- `quantity`: String (required)
- `pickupLocation`: String (required)
- `latitude`: Number (required)
- `longitude`: Number (required)
- `category`: String (required) - `Human Consumption` | `Cattle Feed` | `Biogas / Compost`
- `image`: File (required) - .jpg, .jpeg, .png (max 5MB)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Food posted successfully",
  "data": {
    "_id": "64abc123...",
    "title": "Fresh Vegetables",
    "description": "10kg of fresh vegetables",
    "quantity": "10kg",
    "pickupLocation": "123 Main St, City",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "imagePath": "food-1234567890.jpg",
    "category": "Human Consumption",
    "status": "Available",
    "donorId": {
      "_id": "64abc...",
      "name": "John Doe",
      "email": "donor@example.com"
    },
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### 2. Get All Available Food (NGO Only)
**GET** `/food`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64abc123...",
      "title": "Fresh Vegetables",
      "description": "10kg of fresh vegetables",
      "quantity": "10kg",
      "pickupLocation": "123 Main St, City",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "imagePath": "food-1234567890.jpg",
      "category": "Human Consumption",
      "status": "Available",
      "donorId": {
        "_id": "64abc...",
        "name": "John Doe",
        "email": "donor@example.com"
      },
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Donor's Own Food Posts (Donor Only)
**GET** `/food/donor`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
Similar to "Get All Available Food"

---

### 4. Update Food Post (Donor Only)
**PUT** `/food/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:** (All optional)
- `title`: String
- `description`: String
- `quantity`: String
- `pickupLocation`: String
- `latitude`: Number
- `longitude`: Number
- `category`: String
- `image`: File (optional new image)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Food post updated successfully",
  "data": { /* updated food object */ }
}
```

---

### 5. Delete Food Post (Donor Only)
**DELETE** `/food/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Food post deleted successfully"
}
```

---

### 6. Get All Food Posts (Admin Only)
**GET** `/food/admin/all`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
Returns all food posts regardless of status.

---

## 🚚 DELIVERY ENDPOINTS

### 1. NGO Accepts Food
**POST** `/delivery/accept-food/:foodId`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Food accepted successfully. Delivery task created.",
  "data": {
    "_id": "64abc123...",
    "foodId": { /* food object */ },
    "donorId": { /* donor details */ },
    "ngoId": { /* ngo details */ },
    "deliveryPartnerId": null,
    "status": "Unassigned",
    "otp": "1234",
    "currentLat": null,
    "currentLng": null,
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### 2. Get NGO's Deliveries (NGO Only)
**GET** `/delivery/ngo`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64abc123...",
      "foodId": { /* food details */ },
      "donorId": { /* donor details */ },
      "ngoId": { /* ngo details */ },
      "deliveryPartnerId": { /* partner details or null */ },
      "status": "In Progress",
      "otp": "1234",
      "currentLat": 40.7128,
      "currentLng": -74.0060,
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Unassigned Deliveries (Delivery Partner Only)
**GET** `/delivery/unassigned`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
Returns deliveries where `status = "Unassigned"` and `deliveryPartnerId = null`

---

### 4. Accept Delivery Task (Delivery Partner Only)
**POST** `/delivery/accept/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Delivery accepted successfully",
  "data": { /* delivery object with status "Assigned" */ }
}
```

---

### 5. Start Delivery (Delivery Partner Only)
**POST** `/delivery/start/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Delivery started successfully",
  "data": { /* delivery object with status "In Progress" */ }
}
```

---

### 6. Update Location (Delivery Partner Only)
**POST** `/delivery/update-location/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Location updated successfully",
  "data": {
    "currentLat": 40.7128,
    "currentLng": -74.0060
  }
}
```

---

### 7. Complete Delivery (Delivery Partner Only)
**POST** `/delivery/complete/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "otp": "1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Delivery completed successfully",
  "data": { /* delivery object with status "Completed" */ }
}
```

---

### 8. Get Delivery Partner's Deliveries
**GET** `/delivery/partner`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
Returns all deliveries assigned to the delivery partner.

---

### 9. Get Single Delivery (All authenticated users)
**GET** `/delivery/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* delivery object */ }
}
```

---

### 10. Get All Deliveries (Admin Only)
**GET** `/delivery/admin/all`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
Returns all deliveries in the system.

---

## 👨‍💼 ADMIN ENDPOINTS

### 1. Get All Users
**GET** `/admin/users`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 25,
  "roleCount": {
    "Donor": 10,
    "NGO": 5,
    "Delivery Partner": 8,
    "Admin": 2
  },
  "data": [
    {
      "_id": "64abc123...",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "Donor",
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Analytics
**GET** `/admin/analytics`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 25,
      "totalFood": 50,
      "totalDeliveries": 30,
      "completedDeliveries": 20
    },
    "usersByRole": {
      "donors": 10,
      "ngos": 5,
      "deliveryPartners": 8,
      "admins": 2
    },
    "foodByCategory": {
      "humanConsumption": 30,
      "cattleFeed": 15,
      "biogas": 5
    },
    "foodByStatus": {
      "available": 20,
      "assigned": 10,
      "completed": 20
    },
    "deliveriesByStatus": {
      "unassigned": 5,
      "assigned": 3,
      "inProgress": 2,
      "completed": 20
    },
    "completedDeliveriesByCategory": {
      "humanConsumption": 12,
      "cattleFeed": 6,
      "biogas": 2
    },
    "recentActivities": [
      /* Last 10 deliveries */
    ]
  }
}
```

---

### 3. Delete User
**DELETE** `/admin/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## ❌ ERROR RESPONSES

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided. Please login."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Required role: Admin"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

---

## 📝 NOTES

1. **Authentication**: All endpoints except `/auth/register` and `/auth/login` require JWT token in header.

2. **Token Format**: `Authorization: Bearer <token>`

3. **Image URLs**: Uploaded images are accessible at:
   ```
   http://localhost:5000/uploads/filename.jpg
   ```

4. **Date Format**: All dates are in ISO 8601 format (UTC).

5. **Password Hashing**: Passwords are hashed using SHA-256 (for demo purposes).

6. **OTP**: 4-digit numeric code generated automatically when delivery is created.

7. **Status Flow**:
   - Food: Available → Assigned → Completed
   - Delivery: Unassigned → Assigned → In Progress → Completed
