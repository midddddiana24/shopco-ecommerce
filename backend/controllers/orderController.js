const Order = require('../models/Order');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

const createMailTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;

  if (!user || !pass) {
    return null;
  }

  const transporterConfig = {
    auth: {
      user,
      pass
    }
  };

  if (host) {
    transporterConfig.host = host;
    transporterConfig.port = port ? Number(port) : 465;
    transporterConfig.secure = transporterConfig.port === 465;
  } else {
    transporterConfig.service = 'gmail';
  }

  return nodemailer.createTransport(transporterConfig);
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createMailTransporter();
  if (!transporter) {
    console.log('Email not sent because EMAIL_USER or EMAIL_PASS is not configured.');
    console.log('Email payload:', { to, subject, text, html });
    return;
  }

  await transporter.sendMail({
    from: `CARTELLO <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items'
      });
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    });

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('orderItems.product', 'name images')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const oldStatus = order.status;
    const newStatus = req.body.status;

    order.status = newStatus;

    if (newStatus === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    await order.save();

    // Create notification for user about status change
    if (oldStatus !== newStatus) {
      await Notification.create({
        user: order.user._id,
        name: order.user.name,
        email: order.user.email,
        title: `Order Status Updated`,
        message: `Your order #${order._id.slice(-8).toUpperCase()} status has been updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}.`,
        type: 'order_status',
        recipient: 'user',
        data: {
          orderId: order._id,
          oldStatus: oldStatus,
          newStatus: newStatus
        },
        read: false
      });

      // Send email notification
      await sendEmail({
        to: order.user.email,
        subject: `Order Status Update - CARTELLO`,
        text: `Hi ${order.user.name},\n\nYour order #${order._id.slice(-8).toUpperCase()} status has been updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}.\n\nThank you for shopping with CARTELLO!`,
        html: `<p>Hi ${order.user.name},</p>
               <p>Your order <strong>#${order._id.slice(-8).toUpperCase()}</strong> status has been updated to <strong>${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</strong>.</p>
               <p>Thank you for shopping with CARTELLO!</p>`
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};