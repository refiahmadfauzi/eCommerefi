const bcrypt = require('bcrypt');
const { Users } = require('../models'); // sesuai nama model
const { Op } = require('sequelize');

exports.createUser = async (req, res) => {
  try {
    const { name, phone, address, gender, email, password, date_of_birth } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      phone,
      address,
      gender,
      email,
      password: hashedPassword,
      date_of_birth,
      is_active: true,
      created_at: new Date()
    });

    res.status(201).json(user);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users?search=agus&page=1&limit=10
exports.getUsers = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const baseCondition = { is_active: 1 }; // hanya user aktif

    const searchCondition = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ]
        }
      : {};

    const whereClause = {
      ...baseCondition,
      ...searchCondition,
    };

    const { count, rows } = await Users.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']],
    });

    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /api/users/:id
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, address, gender, email, password, date_of_birth, is_active } = req.body;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash password jika diberikan
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name,
      phone,
      address,
      gender,
      email,
      password: hashedPassword,
      date_of_birth,
      is_active
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Soft delete by updating is_active to 2
    await user.update({ is_active: 2 });

    res.status(200).json({ message: 'User soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
