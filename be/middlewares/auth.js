const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

function isAdmin(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
}

module.exports = { authenticate, isAdmin };
