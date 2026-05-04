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

    // Create admin user (password will be hashed by model's pre-save hook)
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@cartello.com',
      password: 'admin123',
      fullName: 'Cartello Admin',
      isAdmin: true,
      role: 'admin'
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
        description: 'Comfortable cotton t-shirt perfect for everyday wear. Essential item for your wardrobe.',
        price: 1499,
        originalPrice: 1999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123456/cartello/t-shirt.jpg'],
        category: categories[0]._id,
        stock: 50,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Blue Denim Jeans',
        description: 'Premium quality denim jeans with perfect fit. A wardrobe essential.',
        price: 3999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123457/cartello/jeans.jpg'],
        category: categories[0]._id,
        stock: 30,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Summer Dress',
        description: 'Elegant summer dress for special occasions. Fresh and breezy for warm days.',
        price: 2999,
        originalPrice: 4499,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123458/cartello/dress.jpg'],
        category: categories[1]._id,
        stock: 25,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Leather Handbag',
        description: 'Stylish leather handbag with multiple compartments. Perfect for daily use.',
        price: 6499,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123459/cartello/handbag.jpg'],
        category: categories[2]._id,
        stock: 15,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Running Sneakers',
        description: 'Comfortable running shoes for active lifestyle. Perfect for workouts and casual wear.',
        price: 4999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123460/cartello/sneakers.jpg'],
        category: categories[3]._id,
        stock: 40,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Black Blazer',
        description: 'Classic black blazer for professional and casual occasions. Essential basics.',
        price: 5499,
        originalPrice: 7999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123461/cartello/blazer.jpg'],
        category: categories[0]._id,
        stock: 20,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'White Sneakers',
        description: 'Clean white sneakers perfect for any outfit. Versatile and timeless. New arrivals.',
        price: 3499,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123462/cartello/white-sneakers.jpg'],
        category: categories[3]._id,
        stock: 45,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Striped Button-Up Shirt',
        description: 'Casual striped shirt perfect for weekend vibes. Essential basics for your closet.',
        price: 1799,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123463/cartello/striped-shirt.jpg'],
        category: categories[0]._id,
        stock: 35,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Floral Print Skirt',
        description: 'Beautiful floral print skirt for spring and summer. New arrivals collection.',
        price: 2499,
        originalPrice: 3499,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123464/cartello/floral-skirt.jpg'],
        category: categories[1]._id,
        stock: 22,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Gold Watch',
        description: 'Elegant gold watch that works with any outfit. Premium accessories collection.',
        price: 8999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123465/cartello/gold-watch.jpg'],
        category: categories[2]._id,
        stock: 12,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Wool Cardigan',
        description: 'Cozy wool cardigan for cooler days. Best sellers that customers love.',
        price: 3999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123466/cartello/cardigan.jpg'],
        category: categories[0]._id,
        stock: 28,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Ankle Boots',
        description: 'Stylish ankle boots for any season. New arrivals in footwear.',
        price: 4499,
        originalPrice: 6499,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123467/cartello/ankle-boots.jpg'],
        category: categories[3]._id,
        stock: 18,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Casual Sweatshirt',
        description: 'Comfortable sweatshirt perfect for casual days. Essential basics everyone needs.',
        price: 1999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123468/cartello/sweatshirt.jpg'],
        category: categories[1]._id,
        stock: 50,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Sunglasses',
        description: 'Trendy sunglasses to protect your eyes in style. Premium accessories on sale.',
        price: 2999,
        originalPrice: 4999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123469/cartello/sunglasses.jpg'],
        category: categories[2]._id,
        stock: 40,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Oxford Dress Shoes',
        description: 'Professional oxford shoes perfect for formal occasions. Best sellers for work.',
        price: 5999,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123470/cartello/oxfords.jpg'],
        category: categories[3]._id,
        stock: 16,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Silk Scarf',
        description: 'Elegant silk scarf to elevate any look. Best sellers in accessories.',
        price: 1899,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123471/cartello/silk-scarf.jpg'],
        category: categories[2]._id,
        stock: 35,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'High-Waist Jeans',
        description: 'Trendy high-waist jeans for a flattering fit. New arrivals on sale now.',
        price: 3499,
        originalPrice: 5499,
        images: ['https://res.cloudinary.com/dyfmzw2ti/image/upload/v1703123472/cartello/high-waist-jeans.jpg'],
        category: categories[1]._id,
        stock: 24,
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