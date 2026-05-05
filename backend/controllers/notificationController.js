const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');
const User = require('../models/User');

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

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const notificationTitle = subject ? `${subject}` : `New contact request from ${name}`;

    const adminNotification = await Notification.create({
      name,
      email,
      title: notificationTitle,
      message,
      type: 'contact',
      recipient: 'admin',
      data: { subject },
      read: false
    });

    await Notification.create({
      name,
      email,
      title: 'We received your message',
      message: `Thank you for contacting CARTELLO. Our team will review your request and respond as soon as possible.`,
      type: 'acknowledgement',
      recipient: 'user',
      data: { subject },
      read: false
    });

    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `New contact request from ${name}`,
        text: `New message from ${name} (${email})\n\nSubject: ${subject || 'No subject provided'}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, '<br/>')}</p>`
      });
    }

    await sendEmail({
      to: email,
      subject: 'Thank you for contacting CARTELLO',
      text: `Hello ${name},\n\nThank you for reaching out to CARTELLO. We received your message and will get back to you shortly.\n\nBest regards,\nThe CARTELLO Team`,
      html: `<p>Hello ${name},</p>
             <p>Thank you for reaching out to CARTELLO. We received your message and will get back to you shortly.</p>
             <p>Best regards,<br/>The CARTELLO Team</p>`
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. A confirmation email was sent when configured.',
      notification: adminNotification
    });
  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact message.'
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: 'admin' })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required to fetch notifications.'
      });
    }

    const notifications = await Notification.find({
      recipient: 'user',
      email: userEmail
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found.'
      });
    }

    if (req.user.role !== 'admin' && notification.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this notification.'
      });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      success: true,
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
