const bcrypt = require('bcrypt');
const {
  CardUser
} = require('../models'); // sesuai nama model
const {
  Op
} = require('sequelize');

exports.createPayment = async (req, res) => {
  try {
    const {
      name_users,
      card_number,
      bank_name,
      expired_card,
      users_id
    } = req.body;

    const Payment = await CardUser.create({
      name_users,
      card_number,
      bank_name,
      expired_card,
      users_id,
      is_deleted: null,
      created_at: new Date()
    });

    res.status(201).json({
      message: 'Payment updated successfully',
      data: Payment
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

// GET /api/CardUser?search=agus&page=1&limit=10
exports.getPayment = async (req, res) => {
  const {
    search,
    page = 1,
    limit = 10
  } = req.query;
  const offset = (page - 1) * limit;

  try {
    const baseCondition = { is_deleted: null }; // hanya user aktif
    const searchCondition = search ? {
      [Op.or]: [{
        users_id: {
          [Op.like]: `%${search}%`
        }
      }, ]
    } : {};

    const whereClause = {
      ...baseCondition,
      ...searchCondition,
    };


    const {
      count,
      rows
    } = await CardUser.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['created_at', 'DESC']
      ],
    });

    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// GET /api/CardUser/:id
exports.getPaymentByUserId = async (req, res) => {
  const { id } = req.params; // ini adalah users_id

  try {
    const payments = await CardUser.findAll({
      where: {
        users_id: id,
        is_deleted: null
      }
    });

    if (payments.length === 0) {
      return res.status(404).json({
        message: 'No payments found for this user'
      });
    }

    res.json(payments);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const PaymentId = req.params.id;
    const {
      name_users,
      card_number,
      bank_name,
      expired_card
    } = req.body;

    const Payment = await CardUser.findByPk(PaymentId);
    if (!Payment) {
      return res.status(404).json({
        message: 'Payment not found'
      });
    }

    await Payment.update({
      name_users,
      card_number,
      bank_name,
      expired_card,
    });

    res.status(200).json({
      message: 'Payment updated successfully',
      Payment
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const PaymentId = req.params.id;

    const Payment = await CardUser.findByPk(PaymentId);
    if (!Payment) {
      return res.status(404).json({
        message: 'Payment not found'
      });
    }

    // await Payment.destroy();
    await Payment.update({ is_deleted: 1 })

    res.status(200).json({
      message: 'Payment deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};