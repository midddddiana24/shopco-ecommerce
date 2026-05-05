const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
require('dotenv').config();

const createTestOrder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Find a user and product
    const user = await User.findOne({ email: 'admin@cartello.com' });
    const product = await Product.findOne();

    if (!user || !product) {
      console.log('User or product not found');
      return;
    }

    // Create a test order
    const order = await Order.create({
      user: user._id,
      orderItems: [{
        product: product._id,
        quantity: 1,
        price: product.price
      }],
      totalPrice: product.price,
      shippingAddress: {
        fullName: user.fullName || user.name,
        phone: user.phone || '123-456-7890',
        address: '123 Test St',
        city: 'Test City',
        country: 'Test Country',
        zipCode: '12345'
      },
      paymentMethod: 'cod',
      status: 'pending'
    });

    console.log('Test order created:', order._id);
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestOrder();