const mongoose = require('mongoose');
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

const addProducts = async () => {
  try {
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
        console.error('No admin user found. Make sure to run seed.js first.');
        process.exit(1);
    }
    
    // Make sure we have categories
    let mens = await Category.findOne({ name: 'Men\'s Clothing' });
    let womens = await Category.findOne({ name: 'Women\'s Clothing' });
    let acc = await Category.findOne({ name: 'Accessories' });
    let shoes = await Category.findOne({ name: 'Shoes' });

    if (!mens) mens = await Category.create({ name: 'Men\'s Clothing', slug: 'mens-clothing' });
    if (!womens) womens = await Category.create({ name: 'Women\'s Clothing', slug: 'womens-clothing' });
    if (!acc) acc = await Category.create({ name: 'Accessories', slug: 'accessories' });
    if (!shoes) shoes = await Category.create({ name: 'Shoes', slug: 'shoes' });

    const newProducts = [
      {
        name: 'Oversized Graphic Tee',
        description: 'Premium heavyweight cotton oversized t-shirt with custom graphic print. Perfect for a streetwear look.',
        price: 1800,
        originalPrice: 2200,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'],
        category: mens._id,
        stock: 45,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Slim Fit Chinos',
        description: 'Versatile slim-fit chino pants suitable for both casual and semi-formal occasions.',
        price: 2400,
        images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80'],
        category: mens._id,
        stock: 30,
        featured: false,
        createdBy: adminUser._id
      },
      {
        name: 'Vintage Wash Denim Jacket',
        description: 'Classic denim jacket with a vintage wash and distressed details.',
        price: 3500,
        originalPrice: 4200,
        images: ['https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&q=80'],
        category: mens._id,
        stock: 15,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Pleated Midi Skirt',
        description: 'Elegant pleated midi skirt with an elastic waistband for comfort and style.',
        price: 2100,
        images: ['https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=600&q=80'],
        category: womens._id,
        stock: 25,
        featured: false,
        createdBy: adminUser._id
      },
      {
        name: 'Silk Camisole Top',
        description: 'Luxurious silk camisole top, perfect for layering or wearing on its own during summer.',
        price: 1600,
        images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80'],
        category: womens._id,
        stock: 35,
        featured: false,
        createdBy: adminUser._id
      },
      {
        name: 'Tailored Wide-Leg Pants',
        description: 'Sophisticated tailored wide-leg pants for a modern office look.',
        price: 2800,
        images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80'],
        category: womens._id,
        stock: 20,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Minimalist Leather Backpack',
        description: 'Sleek and functional leather backpack with a laptop compartment.',
        price: 5500,
        originalPrice: 6500,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'],
        category: acc._id,
        stock: 12,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Classic Aviator Sunglasses',
        description: 'Timeless aviator sunglasses with polarized lenses and a lightweight metal frame.',
        price: 1500,
        images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'],
        category: acc._id,
        stock: 40,
        featured: false,
        createdBy: adminUser._id
      },
      {
        name: 'Chunky Knit Beanie',
        description: 'Warm and cozy chunky knit beanie, an essential for the colder months.',
        price: 800,
        images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80'],
        category: acc._id,
        stock: 60,
        featured: false,
        createdBy: adminUser._id
      },
      {
        name: 'High-Top Canvas Sneakers',
        description: 'Iconic high-top canvas sneakers, a staple for any casual wardrobe.',
        price: 3200,
        images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80'],
        category: shoes._id,
        stock: 50,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Suede Chelsea Boots',
        description: 'Elegant suede Chelsea boots with a comfortable elastic side panel.',
        price: 4800,
        originalPrice: 5500,
        images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80'],
        category: shoes._id,
        stock: 25,
        featured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Platform Loafers',
        description: 'Trendy platform loafers in patent leather, adding a stylish lift to any outfit.',
        price: 3800,
        images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80'],
        category: shoes._id,
        stock: 18,
        featured: false,
        createdBy: adminUser._id
      }
    ];

    await Product.insertMany(newProducts);
    console.log(`Successfully added ${newProducts.length} more products!`);
    
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    process.exit(0);
  }
};

connectDB().then(() => addProducts());
