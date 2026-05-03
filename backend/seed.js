// Sample data seeder for CARTELLO
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
require('dotenv').config();

const connectDB = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(conn => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    })
    .catch(error => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@cartello.com',
      password: hashedPassword,
      fullName: 'Cartello Admin',
      isAdmin: true
    });

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Men\'s Clothing', slug: 'mens-clothing', description: 'Fashion for men' },
      { name: 'Women\'s Clothing', slug: 'womens-clothing', description: 'Fashion for women' },
      { name: 'Accessories', slug: 'accessories', description: 'Fashion accessories' },
      { name: 'Shoes', slug: 'shoes', description: 'Footwear collection' }
    ]);

    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'Classic White T-Shirt',
        description: 'Comfortable cotton t-shirt perfect for everyday wear',
        price: 29.99,
        originalPrice: 39.99,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123456/cartello/t-shirt.jpg'],
        category: categories[0]._id,
        stock: 50,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Blue Denim Jeans',
        description: 'Premium quality denim jeans with perfect fit',
        price: 79.99,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123457/cartello/jeans.jpg'],
        category: categories[0]._id,
        stock: 30,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Summer Dress',
        description: 'Elegant summer dress for special occasions',
        price: 59.99,
        originalPrice: 89.99,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123458/cartello/dress.jpg'],
        category: categories[1]._id,
        stock: 25,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Leather Handbag',
        description: 'Stylish leather handbag with multiple compartments',
        price: 129.99,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123459/cartello/handbag.jpg'],
        category: categories[2]._id,
        stock: 15,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Running Sneakers',
        description: 'Comfortable running shoes for active lifestyle',
        price: 99.99,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123460/cartello/sneakers.jpg'],
        category: categories[3]._id,
        stock: 40,
        featured: true,
        createdBy: adminUser._id
      }
    ]);

    console.log('✅ Sample data seeded successfully!');
    console.log(`Created ${categories.length} categories and ${products.length} products`);
    console.log('Admin login: admin@cartello.com / admin123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit();
  }
};

// Run seeder
connectDB().then(() => seedData());

// Run seeder
(async () => {
  await connectDB();
  await seedData();
})();