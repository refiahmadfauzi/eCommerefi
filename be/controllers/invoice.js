const bcrypt = require('bcrypt');
const {
  Invoice,
  HistoryOrder,
  Cart,
  ProductSize
} = require('../models'); // sesuai nama model
const {
  Op
} = require('sequelize');

exports.createInvoice = async (req, res) => {
  try {
    const {
      status_shipping,
      shipping_price,
      date_shipping,
      date_order,
      total_price,
      orders,
      users_id
    } = req.body;

    const firstOrder = orders[0];
    const timestamp = new Date(date_order).getTime();
    const recipt = `INV-${timestamp}-${firstOrder.product_id}${firstOrder.product_size_id}${firstOrder.product_qty}`;

    // Buat invoice
    const datainv = await Invoice.create({
      recipt,
      status_shipping,
      shipping_price,
      date_shipping,
      date_order,
      total_price,
      users_id,
      created_at: new Date()
    });

    // Simpan orderan
    const orderData = orders.map(item => ({
      cart_id: item.cart_id,
      users_id: item.users_id,
      product_id: item.product_id,
      product_size_id: item.product_size_id,
      product_name: item.product_name,
      product_size: item.product_size,
      product_qty: item.product_qty,
      product_price: item.product_price,
      invoice_id: datainv.id
    }));

    const dataorder = await HistoryOrder.bulkCreate(orderData);

    // Ubah status_cart menjadi 'checkout' untuk semua cart milik users_id
    const usersId = firstOrder.users_id;
    await Cart.update({
      status_cart: 'checkout'
    }, {
      where: {
        users_id: usersId
      }
    });

    // Kurangi stok product_size
    for (const order of orders) {
      const dataSize = await ProductSize.findByPk(order.product_size_id);

      if (dataSize) {
        const newQty = dataSize.product_qty - order.product_qty;
        await dataSize.update({
          product_qty: newQty < 0 ? 0 : newQty
        }); // jaga-jaga tidak negatif
      }
    }

    res.status(201).json({
      message: 'Invoice created successfully',
      data_inv: datainv,
      data_orders: dataorder
    });

  } catch (err) {
    console.error('Error during invoice creation:', err);
    res.status(500).json({
      error: err.message
    });
  }
};


// GET /api/Invoice?search=agus&page=1&limit=10
exports.getInvoice = async (req, res) => {
  const {
    search,
    page = 1,
    limit = 10
  } = req.query;
  const offset = (page - 1) * limit;

  try {
    const whereClause = search ? {
      [Op.or]: [{
        name_users: {
          [Op.like]: `%${search}%`
        }
      }, ]
    } : {};

    const {
      count,
      rows
    } = await Invoice.findAndCountAll({
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

// GET /api/Invoice/:id
exports.getInvoiceById = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const Invoice = await Invoice.findByPk(id);

    if (!Invoice) return res.status(404).json({
      message: 'Invoice not found'
    });

    res.json(Invoice);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const InvoiceId = req.params.id;
    const {
      nama_user,
      card_number,
      bank_name,
      expired_card
    } = req.body;

    const Invoice = await Invoice.findByPk(InvoiceId);
    if (!Invoice) {
      return res.status(404).json({
        message: 'Invoice not found'
      });
    }

    await Invoice.update({
      nama_user,
      card_number,
      bank_name,
      expired_card,
    });

    res.status(200).json({
      message: 'Invoice updated successfully',
      Invoice
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const InvoiceId = req.params.id;

    const Invoice = await Invoice.findByPk(InvoiceId);
    if (!Invoice) {
      return res.status(404).json({
        message: 'Invoice not found'
      });
    }

    await Invoice.destroy();

    res.status(200).json({
      message: 'Invoice deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};