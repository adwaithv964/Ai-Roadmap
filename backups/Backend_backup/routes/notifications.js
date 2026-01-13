const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/')
  .get(authMiddleware, notificationController.getNotifications)
  .post(authMiddleware, notificationController.addNotification)
  .delete(authMiddleware, notificationController.clearNotifications);

module.exports = router;