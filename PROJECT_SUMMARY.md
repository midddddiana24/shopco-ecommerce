# CARTELLO Project Summary

## What this project uses

### Backend

- Node.js with Express
- MongoDB via Mongoose
- JSON Web Tokens (JWT) for authentication and protected routes
- bcryptjs for password hashing and user security
- dotenv for environment configuration
- cors for cross-origin requests
- cookie-parser for cookie handling
- express-validator for request validation
- nodemailer for sending contact emails
- Cloudinary for image storage and delivery
- multer + multer-storage-cloudinary for handling product image uploads

### Frontend

- Vanilla HTML/CSS/JavaScript
- Tailwind CSS via CDN for layout and responsive design
- Font Awesome icons
- Local storage for cart state, auth tokens, and user session
- Custom `app.js`, `auth.js`, `cart.js`, `products.js` scripts for UI behavior

## Cloud Storage

- Uses Cloudinary as the primary cloud image storage provider
- Backend config: `backend/config/cloudinary.js`
- Upload middleware: `backend/middleware/upload.js`
- Product images are uploaded to Cloudinary and stored in the `cartello/products` folder
- Seed data contains Cloudinary image URLs for sample products

## Main APIs and Routes

### Authentication

- `POST /api/auth/register` — create a new user account
- `POST /api/auth/login` — authenticate and return JWT token
- `POST /api/auth/logout` — logout endpoint (protected)
- `GET /api/auth/me` — get profile data for the current user
- `PUT /api/auth/profile` — update current user profile

### Products

- `GET /api/products` — list products (supports filtering, search, sorting, pagination)
- `GET /api/products/:id` — get product details
- `POST /api/products` — create product (admin only)
- `PUT /api/products/:id` — update product (admin only)
- `DELETE /api/products/:id` — delete product (admin only)

### Categories

- `GET /api/categories` — list categories
- `POST /api/categories` — create a category (admin only)
- `PUT /api/categories/:id` — update category (admin only)
- `DELETE /api/categories/:id` — delete category (admin only)

### Orders

- `POST /api/orders` — create a new order
- `GET /api/orders/myorders` — list orders for the logged-in user
- `GET /api/orders/:id` — get an order by ID (user or admin)
- `GET /api/orders` — list all orders (admin only)
- `PUT /api/orders/:id/status` — update order status (admin only)

### Notifications / Contact

- `POST /api/contact` — submit a contact/support request
- `GET /api/notifications` — get admin notifications (admin only)
- `GET /api/notifications/user` — get notifications for current user
- `PUT /api/notifications/:id/read` — mark notification as read

## Features of this system

### User features

- User registration and login
- Profile updates
- Persistent cart using browser storage
- Product search and category filters
- Order checkout and order history
- Responsive navigation and mobile menu
- Contact form with notification and email support

### Admin features

- Create/update/delete products
- Upload product images to Cloudinary
- Manage categories
- View all orders and update order status
- See notification records for support or system events

### Product and shop features

- Search by name and description
- Filter products by category, price range, and stock availability
- Sort products by price, name, and newest arrivals
- Pagination support for product listing
- Product image gallery and rich product detail display

## Environment variables

- `PORT` — server port
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing key
- `FRONTEND_URL` — allowed frontend origin for CORS
- `CLOUDINARY_CLOUD_NAME` — Cloudinary account name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `EMAIL_USER` — email address used for notifications
- `EMAIL_PASS` — email password or app password
- `EMAIL_HOST` — SMTP host (optional)
- `EMAIL_PORT` — SMTP port (optional)
- `ADMIN_EMAIL` — optional admin email for contact notifications

## Project structure

### Backend

- `backend/server.js` — main Express server setup
- `backend/config/database.js` — MongoDB connection
- `backend/config/cloudinary.js` — Cloudinary credentials and setup
- `backend/routes/` — route definitions for auth, products, categories, orders, notifications
- `backend/controllers/` — request handlers and business logic
- `backend/models/` — Mongoose schemas for User, Product, Order, Category, Notification
- `backend/middleware/` — auth, error handling, file upload middleware

### Frontend

- `frontend/index.html` — homepage
- `frontend/pages/products.html` — shop page
- `frontend/pages/cart.html` — cart page
- `frontend/pages/checkout.html` — checkout page
- `frontend/pages/login.html` — login page
- `frontend/pages/register.html` — registration page
- `frontend/pages/orders.html` — order history page
- `frontend/pages/profile.html` — user profile page
- `frontend/js/` — client-side JavaScript
- `frontend/css/styles.css` — custom styles

## Notes

- The backend serves the frontend static files from `frontend/`
- Cloudinary is used for all product image uploads and delivery
- The system uses JWT auth, but frontend stores tokens in local storage
- The responsive nav and mobile layout are handled with Tailwind utility classes
