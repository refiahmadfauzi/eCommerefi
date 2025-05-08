const bcrypt = require('bcrypt');
const { Users,Admins } = require('../models'); // sesuai nama model
const { generateToken } = require('../untility/jwt');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Tambahkan kondisi is_active: 1
    const user = await Users.findOne({ where: { email, is_active: 1 } });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Email tidak ditemukan atau akun tidak aktif.' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await Admins.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Username tidak ditemukan.' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error); // log ke terminal
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  
};
