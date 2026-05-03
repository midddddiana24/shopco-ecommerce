# 🛒 CARTELLO - Complete E-Commerce System Build Guide

> A professional, responsive mini e-commerce platform with admin and user dashboards, built with modern web technologies.

---

## 📋 PROJECT OVERVIEW

**System Name:** CARTELLO  
**Type:** Full-Stack E-Commerce Platform  
**Target:** Mobile-First, Responsive Design  
**Features:**

- User Authentication (Register/Login)
- Product Listing & Search
- Shopping Cart & Checkout
- Order Management
- Admin Dashboard
- Image Upload to Cloud
- Cloud Database
- Payment Integration (Optional)

---

## 🛠️ TECH STACK

| Layer                | Technology                              | Purpose         |
| -------------------- | --------------------------------------- | --------------- |
| **Frontend**         | HTML5, Tailwind CSS, Vanilla JavaScript | UI/UX           |
| **Backend**          | Node.js, Express.js                     | API Server      |
| **Database**         | MongoDB Atlas (Free Tier)               | Cloud Database  |
| **Storage**          | Cloudinary (Free Tier)                  | Image Storage   |
| **Authentication**   | JWT + bcryptjs                          | Secure Auth     |
| **Version Control**  | GitHub/Git                              | Code Repository |
| **Backend Hosting**  | Render                                  | Deploy Backend  |
| **Frontend Hosting** | Vercel                                  | Deploy Frontend |

---

## ✅ PROJECT SETUP CHECKLIST

### Phase 1: Environment & Git Setup ⏱️ 30 minutes

- [ ] **1.1** Initialize Git repository
- [ ] **1.2** Create GitHub repository
- [ ] **1.3** Push initial project to GitHub
- [ ] **1.4** Create .gitignore (node_modules, .env)
- [ ] **1.5** Set up local environment variables

### Phase 2: Backend Foundation ⏱️ 2-3 hours

- [x] **2.1** Verify Node.js & npm installation
- [x] **2.2** Install backend dependencies (already done ✓)
- [x] **2.3** Set up MongoDB Atlas free tier
- [x] **2.4** Test MongoDB connection ✅ WORKING
- [x] **2.5** Configure Cloudinary account
- [x] **2.6** Update environment variables ✅ DONE
- [x] **2.7** Test API server startup ✅ WORKING
- [x] **2.8** Fix route imports and middleware ✅ DONE
- [x] **2.9** Seed sample data ✅ DONE (5 products, 4 categories, 1 admin user)

### Phase 3: Backend API Development ⏱️ 4-5 hours

- [ ] **3.1** Build User model & authentication
- [ ] **3.2** Build Category model
- [ ] **3.3** Build Product model
- [ ] **3.4** Build Order model
- [ ] **3.5** Create authentication routes & controller
- [ ] **3.6** Create product routes & controller
- [ ] **3.7** Create category routes & controller
- [ ] **3.8** Create order routes & controller
- [ ] **3.9** Implement image upload middleware
- [ ] **3.10** Test all API endpoints with Postman

### Phase 4: Frontend Core Pages ⏱️ 3-4 hours

- [x] **4.1** Update homepage design (inspired by reference) ✅ DONE
- [x] **4.2** Create products listing page ✅ EXISTS
- [x] **4.3** Create product detail page ✅ EXISTS
- [x] **4.4** Create cart page ✅ EXISTS
- [x] **4.5** Create checkout page ✅ EXISTS
- [x] **4.6** Create login page ✅ EXISTS
- [x] **4.7** Create register page ✅ EXISTS
- [x] **4.8** Create user orders page ✅ EXISTS
- [x] **4.9** Integrate API with frontend ✅ WORKING (Products loading from API)

### Phase 5: Frontend JavaScript Logic ⏱️ 3-4 hours

- [x] **5.1** Implement authentication logic (login/register) ✅ DONE
- [x] **5.2** Create API service module ✅ DONE
- [x] **5.3** Implement product fetching & display ✅ DONE
- [x] **5.4** Implement shopping cart functionality ✅ DONE
- [x] **5.5** Implement checkout flow (needs testing)
- [x] **5.6** Implement order history display (needs testing)
- [x] **5.7** Add form validation ✅ EXISTS
- [x] **5.8** Implement error handling ✅ DONE

### Phase 6: Admin Dashboard ⏱️ 3-4 hours

- [x] **6.1** Create admin dashboard layout ✅ DONE
- [x] **6.2** Create product management page ✅ DONE
- [x] **6.3** Create order management page ✅ EXISTS
- [x] **6.4** Create category management ✅ EXISTS
- [x] **6.5** Implement add/edit/delete products ✅ DONE
- [x] **6.6** Implement order status updates (needs testing)
- [x] **6.7** Create admin authentication guard ✅ DONE
- [x] **6.8** Add analytics/statistics dashboard (basic version exists)

### Phase 7: Responsive Design & Testing ⏱️ 2-3 hours

- [ ] **7.1** Test on mobile devices (375px)
- [ ] **7.2** Test on tablets (768px)
- [ ] **7.3** Test on desktop (1024px+)
- [ ] **7.4** Test all forms and validations
- [ ] **7.5** Test image uploads
- [ ] **7.6** Test cart functionality
- [ ] **7.7** Test authentication flows

### Phase 8: Deployment ⏱️ 1-2 hours

- [ ] **8.1** Deploy backend to Render
- [ ] **8.2** Configure Render environment variables
- [ ] **8.3** Deploy frontend to Vercel
- [ ] **8.4** Configure Vercel API proxy
- [ ] **8.5** Test live application
- [ ] **8.6** Set up custom domain (optional)

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### STEP 1: Initialize Git & GitHub

```bash
# Navigate to project directory
cd c:/Users/rober/Desktop/CARTELLO

# Initialize git (if not already done)
git init

# Create .gitignore
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "uploads/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "dist/" >> .gitignore

# Stage and commit
git add .
git commit -m "Initial commit: Cartello e-commerce system"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/cartello.git
git branch -M main
git push -u origin main
```

---

### STEP 2: Setup MongoDB Atlas (Free Tier)

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Create Account:** Sign up with email
3. **Create Organization:** Use default or create new
4. **Create Project:** Name it "Cartello"
5. **Create Cluster:**
   - Select "Free" tier
   - Choose cloud provider (AWS, Google Cloud, Azure)
   - Select region closest to you
   - Click "Create"
6. **Wait for deployment** (2-5 minutes)
7. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: (Generate secure password)
   - Save credentials
8. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
9. **Get Connection String:**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Update in `.env` as `MONGODB_URI`

---

### STEP 3: Setup Cloudinary (Free Tier)

1. **Go to:** https://cloudinary.com/users/register/free
2. **Sign up** with email
3. **Verify email**
4. **Go to Dashboard**
5. **Find these values:**
   - **Cloud Name** (at top of dashboard)
   - **API Key** (in Settings → API Keys)
   - **API Secret** (in Settings → API Keys)
6. **Update `.env` file:**
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

### STEP 4: Test Backend Server

```bash
cd backend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Expected output:
# Server running on port 5000
# MongoDB connected successfully
```

✅ **If no errors:** Backend is ready!

---

### STEP 5: Build Core Models

**File:** `backend/models/User.js`

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  avatar: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  city: { type: String, default: null },
  country: { type: String, default: null },
  zipCode: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
```

**File:** `backend/models/Category.js`

```javascript
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: "" },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Category", categorySchema);
```

**File:** `backend/models/Product.js`

```javascript
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: null },
  image: { type: String, required: true },
  images: [{ type: String }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
```

**File:** `backend/models/Order.js`

```javascript
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    zipCode: String,
  },
  paymentMethod: { type: String, default: "cod" }, // cod = Cash on Delivery
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  trackingNumber: { type: String, default: null },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
```

---

### STEP 6: Update API Routes & Controllers

**File:** `backend/routes/authRoutes.js`

```javascript
const express = require("express");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.getMe);
router.put("/profile", authMiddleware, authController.updateProfile);

module.exports = router;
```

**File:** `backend/routes/productRoutes.js`

```javascript
const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const { uploadImage } = require("../middleware/upload");

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/search/:query", productController.searchProducts);

// Admin routes
router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadImage.single("image"),
  productController.createProduct,
);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  uploadImage.single("image"),
  productController.updateProduct,
);
router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
```

**File:** `backend/routes/orderRoutes.js`

```javascript
const express = require("express");
const orderController = require("../controllers/orderController");
const { authMiddleware, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, orderController.createOrder);
router.get("/user/:userId", authMiddleware, orderController.getUserOrders);
router.get("/:id", authMiddleware, orderController.getOrderById);
router.put(
  "/:id/status",
  authMiddleware,
  isAdmin,
  orderController.updateOrderStatus,
);
router.get("/", authMiddleware, isAdmin, orderController.getAllOrders);

module.exports = router;
```

---

### STEP 7: Frontend Homepage & Structure

**File:** `frontend/index.html` (Update Main Content)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CARTELLO - Shop Fashion & Style</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body class="font-sans">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
      >
        <a href="index.html" class="text-2xl font-bold text-black">CARTELLO</a>
        <ul class="hidden md:flex gap-8">
          <li><a href="index.html" class="hover:text-gray-600">Home</a></li>
          <li>
            <a href="pages/products.html" class="hover:text-gray-600">Shop</a>
          </li>
          <li><a href="#about" class="hover:text-gray-600">About</a></li>
          <li><a href="#contact" class="hover:text-gray-600">Contact</a></li>
        </ul>
        <div class="flex gap-4 items-center">
          <a href="pages/cart.html" class="relative">
            <i class="fas fa-shopping-cart text-xl"></i>
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              id="cartCount"
              >0</span
            >
          </a>
          <div class="flex gap-2">
            <a
              href="pages/login.html"
              class="px-4 py-2 border border-black rounded"
              >Login</a
            >
            <a
              href="pages/register.html"
              class="px-4 py-2 bg-black text-white rounded"
              >Register</a
            >
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gray-100 py-20">
      <div
        class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <h1 class="text-5xl font-bold mb-4">
            Find Clothes That Match Your Style
          </h1>
          <p class="text-gray-600 mb-6">
            Browse through our exclusive collection of fashion items curated
            just for you.
          </p>
          <a
            href="pages/products.html"
            class="bg-black text-white px-8 py-3 rounded inline-block hover:bg-gray-800"
            >Shop Now</a
          >
        </div>
        <div
          class="bg-gray-300 h-96 rounded-lg flex items-center justify-center"
        >
          <img
            id="heroImage"
            src="images/hero.jpg"
            alt="Hero"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div
        id="featuredProducts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <!-- Loaded dynamically -->
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black text-white py-12 mt-16">
      <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold mb-4">CARTELLO</h3>
          <p class="text-gray-400">Your one-stop shop for fashion and style.</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white">About Us</a></li>
            <li><a href="#" class="hover:text-white">Contact</a></li>
            <li><a href="#" class="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Customer Service</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white">Shipping Info</a></li>
            <li><a href="#" class="hover:text-white">Returns</a></li>
            <li><a href="#" class="hover:text-white">Help Center</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Follow Us</h4>
          <div class="flex gap-4">
            <a href="#" class="hover:text-blue-400"
              ><i class="fab fa-facebook"></i
            ></a>
            <a href="#" class="hover:text-blue-400"
              ><i class="fab fa-twitter"></i
            ></a>
            <a href="#" class="hover:text-pink-400"
              ><i class="fab fa-instagram"></i
            ></a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2026 CARTELLO. All rights reserved.</p>
      </div>
    </footer>

    <script src="js/app.js"></script>
  </body>
</html>
```

---

### STEP 8: Frontend JavaScript API Integration

**File:** `frontend/js/app.js`

```javascript
// API Configuration
const API_URL = "http://localhost:5000/api";

// Get cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
}

// Fetch and display featured products
async function loadFeaturedProducts() {
  try {
    const response = await fetch(`${API_URL}/products?featured=true`);
    const products = await response.json();
    const container = document.getElementById("featuredProducts");

    container.innerHTML = products
      .slice(0, 4)
      .map(
        (product) => `
            <div class="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="font-bold mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-2">${product.description.substring(0, 50)}...</p>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold">$${product.price}</span>
                        <button onclick="addToCart(${product._id}, '${product.name}', ${product.price}, '${product.image}')" class="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Add to cart
function addToCart(productId, name, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadFeaturedProducts();
});
```

---

### STEP 9: Admin Dashboard

**File:** `frontend/pages/admin/dashboard.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CARTELLO Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
  </head>
  <body class="bg-gray-100">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-black text-white">
        <div class="p-6 text-2xl font-bold">CARTELLO Admin</div>
        <nav class="mt-6">
          <a href="#dashboard" class="block px-6 py-3 hover:bg-gray-800"
            ><i class="fas fa-chart-line mr-3"></i>Dashboard</a
          >
          <a href="#products" class="block px-6 py-3 hover:bg-gray-800"
            ><i class="fas fa-boxes mr-3"></i>Products</a
          >
          <a href="#orders" class="block px-6 py-3 hover:bg-gray-800"
            ><i class="fas fa-shopping-bag mr-3"></i>Orders</a
          >
          <a href="#categories" class="block px-6 py-3 hover:bg-gray-800"
            ><i class="fas fa-list mr-3"></i>Categories</a
          >
          <a href="#users" class="block px-6 py-3 hover:bg-gray-800"
            ><i class="fas fa-users mr-3"></i>Users</a
          >
          <a
            href="../../index.html"
            class="block px-6 py-3 hover:bg-gray-800 mt-6 border-t border-gray-700"
            ><i class="fas fa-sign-out-alt mr-3"></i>Logout</a
          >
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <div class="p-8">
          <!-- Dashboard Overview -->
          <div id="dashboard" class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-gray-600 text-sm font-semibold">Total Orders</h3>
              <p class="text-4xl font-bold mt-2" id="totalOrders">0</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-gray-600 text-sm font-semibold">
                Total Products
              </h3>
              <p class="text-4xl font-bold mt-2" id="totalProducts">0</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-gray-600 text-sm font-semibold">Total Users</h3>
              <p class="text-4xl font-bold mt-2" id="totalUsers">0</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-gray-600 text-sm font-semibold">Revenue</h3>
              <p class="text-4xl font-bold mt-2" id="totalRevenue">$0</p>
            </div>
          </div>

          <!-- Products Section -->
          <div id="products" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-bold mb-4">Product Management</h2>
            <button
              onclick="showAddProductForm()"
              class="bg-black text-white px-6 py-2 rounded mb-4"
            >
              + Add Product
            </button>
            <table class="w-full">
              <thead class="border-b">
                <tr>
                  <th class="text-left py-3">Name</th>
                  <th class="text-left py-3">Category</th>
                  <th class="text-left py-3">Price</th>
                  <th class="text-left py-3">Stock</th>
                  <th class="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody id="productsTable">
                <!-- Loaded dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <script src="../../js/app.js"></script>
  </body>
</html>
```

---

## 📱 Responsive Design Checklist

Your site will be responsive across:

- **Mobile** (320px - 480px)
- **Tablet** (481px - 768px)
- **Desktop** (769px - 1920px)

All Tailwind classes used (`md:`, `lg:`) automatically handle this.

---

## 🌐 Deployment Guide

### Deploy Backend to Render

1. Push code to GitHub
2. Go to https://render.com
3. Create account & login
4. Click "New +"
5. Select "Web Service"
6. Connect GitHub repository
7. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NODE_ENV=production`
8. Deploy!

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Set build settings:
   - **Framework:** None (Static)
   - **Output Directory:** `frontend`
5. Add environment variable:
   - `VITE_API_URL=https://your-render-backend-url/api`
6. Deploy!

---

## 📚 Next Steps

1. ✅ Follow this guide step by step
2. ✅ Test each phase before moving to the next
3. ✅ Keep code organized and commented
4. ✅ Use Postman to test API endpoints
5. ✅ Test on multiple devices
6. ✅ Monitor Render and Vercel dashboards

---

## 🆘 Troubleshooting

| Issue                    | Solution                                                |
| ------------------------ | ------------------------------------------------------- |
| MongoDB connection fails | Check `.env` file, verify IP whitelist in MongoDB Atlas |
| Cloudinary upload fails  | Check API credentials, ensure file size < 100MB         |
| CORS errors              | Add frontend URL to `FRONTEND_URL` in `.env`            |
| Images not displaying    | Verify Cloudinary credentials and image URLs            |
| Cart not persisting      | Check browser localStorage, clear cache                 |

---

## 📞 Support Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Render Docs:** https://render.com/docs

---

**Total Estimated Time:** 18-25 hours (can be done in 3-5 days with 4-5 hours/day)

**Status:** ✅ Ready to build!

---

_Last Updated: May 3, 2026_  
_Project: CARTELLO E-Commerce System_
