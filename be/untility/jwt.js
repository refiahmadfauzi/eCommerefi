const jwt = require('jsonwebtoken');
const secretKey = 'rahasia_anda'; // Jangan hardcode di production!

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    secretKey,
    { expiresIn: '1d' }
  );
};