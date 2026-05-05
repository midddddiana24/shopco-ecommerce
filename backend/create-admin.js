const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({ email: 'admin@cartello.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@cartello.com',
      password: 'admin123',
      fullName: 'Cartello Admin',
      isAdmin: true,
      role: 'admin'
    });

    console.log('Admin user created:', adminUser._id);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
};

createAdmin();