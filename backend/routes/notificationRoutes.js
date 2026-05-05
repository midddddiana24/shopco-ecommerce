const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createContactMessage,
  getNotifications,
  getUserNotifications,
  markNotificationRead
} = require('../controllers/notificationController');

router.post('/contact', createContactMessage);
router.get('/notifications', protect, authorize('admin'), getNotifications);
router.get('/notifications/user', protect, getUserNotifications);
router.put('/notifications/:id/read', protect, markNotificationRead);

module.exports = router;
