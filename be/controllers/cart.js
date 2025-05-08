const bcrypt = require('bcrypt');
const {
  Cart,
  Product,
  ProductSize
} = require('../models'); // sesuai nama model
const {
  Op
} = require('sequelize');

exports.createCart = async (req, res) => {
  try {
    const {
      users_id,
      product_id,
      product_size_id,
      product_qty
    } = req.body;

    // Cek apakah data dengan kombinasi user, product, size sudah ada
    const existingCart = await Cart.findOne({
      where: {
        users_id,
        product_id,
        product_size_id,
        status_cart: 'show'
      }
    });

    if (existingCart) {
      // Jika sudah ada, update quantity-nya
      existingCart.product_qty += product_qty;
      await existingCart.save();
      return res.status(200).json({
        message: "Cart updated",
        data: existingCart
      });
    }

    // Jika belum ada, buat cart baru
    const newCart = await Cart.create({
      users_id,
      product_id,
      product_size_id,
      product_qty,
      created_at: new Date(),
      status_cart: 'show'
    });

    res.status(201).json({
      message: "Cart created",
      data: newCart
    });
  } catch (err) {
    console.error('Error during add to cart:', err);
    res.status(500).json({
      error: err.message
    });
  }
};


// GET /api/Cart?search=agus&page=1&limit=10
exports.getCart = async (req, res) => {
  const {
    search,
    users_id,
    page = 1,
    limit = 10
  } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Bangun whereClause dengan kondisi users_id dan status_cart = 'show'
    let whereClause = {
      status_cart: 'show'
    };

    if (users_id) {
      whereClause.users_id = users_id;
    }

    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          {
            users_id: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      };
    }

    const { count, rows } = await Cart.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Product,
          attributes: ['name', 'photo', 'price'],
        },
        {
          model: ProductSize,
          attributes: ['product_size','product_qty'],
        }
      ]
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

// GET /api/Cart/:id
exports.getCartById = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const data = await Cart.findByPk(id);

    if (!data) return res.status(404).json({
      message: 'data not found'
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({
      message: "Cart not found"
    });

    cart.product_qty = req.body.product_qty;
    await cart.save();

    res.json({
      message: "Cart updated",
      data: cart
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const dataId = req.params.id;

    const data = await Cart.findByPk(dataId);
    if (!data) {
      return res.status(404).json({
        message: 'data not found'
      });
    }

    await data.destroy();

    res.status(200).json({
      message: 'data deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};