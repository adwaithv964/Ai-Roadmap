const admin = require('firebase-admin');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    // Find user in our DB or create one if they don't exist
    // This is more efficient than checking in every controller
    let user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      user = await User.create({ firebaseUid: uid, email });
    }

    // Attach the full mongoose user object to the request
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;