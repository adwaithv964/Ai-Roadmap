// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    // Notifications are already on the user object from middleware
    // Sort by timestamp descending to show newest first
    const sortedNotifications = req.user.notifications.sort((a, b) => b.id - a.id);
    res.status(200).json(sortedNotifications);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Add a new notification
// @route   POST /api/notifications
// @access  Private
exports.addNotification = async (req, res) => {
  try {
    const { id, title, message, icon } = req.body;

    if (!id || !title || !message || !icon) {
        return res.status(400).json({ msg: 'Missing notification fields.' });
    }

    const newNotification = { id, title, message, icon };
    const user = req.user;

    user.notifications.unshift(newNotification); // Add to the start of the array

    // Limit the number of stored notifications to prevent large document size
    if (user.notifications.length > 30) {
        user.notifications = user.notifications.slice(0, 30);
    }
    
    await user.save();
    res.status(201).json(user.notifications);
  } catch (error) {
    console.error('Add Notification Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Clear all notifications for a user
// @route   DELETE /api/notifications
// @access  Private
exports.clearNotifications = async (req, res) => {
  try {
    req.user.notifications = [];
    await req.user.save();
    res.status(200).json({ msg: 'All notifications cleared' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};