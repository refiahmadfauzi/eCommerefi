const bcrypt = require('bcrypt');
const { Admins } = require('../models'); // sesuai nama model
const { Op } = require('sequelize');

exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const Admin = await Admins.create({
      username,
      password: hashedPassword,
      created_at: new Date()
    });

    res.status(201).json(Admin);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/Admins?search=agus&page=1&limit=10
exports.getAdmins = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const whereClause = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ]
        }
      : {};

    const { count, rows } = await Admins.findAndCountAll({
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

// GET /api/Admins/:id
exports.getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const Admin = await Admins.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!Admin) return res.status(404).json({ message: 'Admin not found' });

    res.json(Admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const AdminId = req.params.id;
    const { username, password } = req.body;

    const Admin = await Admins.findByPk(AdminId);
    if (!Admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Hash password jika diberikan
    let hashedPassword = Admin.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await Admin.update({
      username,
      password: hashedPassword,
    });

    res.status(200).json({ message: 'Admin updated successfully', Admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const AdminId = req.params.id;

    const Admin = await Admins.findByPk(AdminId);
    if (!Admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await Admin.destroy();

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
