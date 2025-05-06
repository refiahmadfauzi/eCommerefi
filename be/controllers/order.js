// controllers/orderController.js
const {
  Invoice,
  HistoryOrder,
  Users,
  CardUser
} = require('../models');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const {
  Op
} = require('sequelize'); // Ensure Op is required for Sequelize operators


exports.getOrdersByUser = async (req, res) => {
  try {
    const {
      users_id
    } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const {
      count,
      rows: invoices
    } = await Invoice.findAndCountAll({
      where: {
        users_id // filter langsung dari tabel Invoice
      },
      include: [{
          model: HistoryOrder,
          as: 'orders',
        },
        {
          model: Users,
          as: 'user',
        },
        {
          model: CardUser,
          as: 'card',
        }

      ],
      distinct: true, // pastikan count hanya menghitung invoice
      order: [
        ['created_at', 'DESC']
      ],
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      message: `Orders for user ${users_id} retrieved successfully`,
      currentPage: page,
      totalPages,
      totalOrders: count,
      data: invoices
    });

  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({
      error: err.message
    });
  }
};



exports.getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 10; // default limit = 10
    const offset = (page - 1) * limit;
    const search = req.query.search || ''; // Capture search term

    // Prepare search query (search by invoice_id or invoice_name)
    const searchQuery = {
      [Op.or]: [{
          recipt: {
            [Op.like]: `%${search}%` // Search in the invoice_id field
          }
        },

      ]
    };

    const {
      count,
      rows: invoices
    } = await Invoice.findAndCountAll({
      where: searchQuery, // Apply the search filter
      include: [{
          model: HistoryOrder,
          as: 'orders',
        },
        {
          model: Users,
          as: 'user',
          attributes: ['id', 'name', 'phone', 'address'] // sesuaikan field yang dibutuhkan
        },
        {
          model: CardUser,
          as: 'card',
          attributes: ['name_users', 'card_number', 'bank_name'] // sesuaikan field yang dibutuhkan
        }
      ],
      order: [
        ['created_at', 'DESC']
      ],
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      message: 'Get Orders successfully',
      currentPage: page,
      totalPages,
      totalOrders: count,
      data: invoices
    });

  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

exports.downloadInvoicePDF = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const invoice = await Invoice.findOne({
      where: {
        id: invoiceId
      },
      include: [{
          model: HistoryOrder,
          as: 'orders'
        },
        {
          model: Users,
          as: 'user'
        }
      ]
    });

    if (!invoice) {
      return res.status(404).json({
        message: 'Invoice not found'
      });
    }

    const doc = new PDFDocument({
      margin: 50
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=Invoice-${invoice.recipt}.pdf`);
    doc.pipe(res);

    // Header
    const logoPath = path.join(__dirname, '../public/logo-company.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, {
        width: 80
      });
    }

    doc.fontSize(20).text('INVOICE', 150, 50, {
      align: 'right'
    });
    doc.fontSize(10).text(`No: ${invoice.recipt}`, {
      align: 'right'
    });
    doc.text(`Tanggal: ${new Date(invoice.created_at).toLocaleDateString()}`, {
      align: 'right'
    });

    doc.moveDown(3);
    doc.fontSize(12).text(`Kepada: ${invoice.user?.name || '-'} - ${invoice.user?.phone || '-'}`);
    doc.fontSize(12).text(`Alamat: ${invoice.user?.address || '-'}`);
    doc.text(`Status Pengiriman: ${invoice.status_shipping}`);
    doc.text(`Tanggal Order: ${new Date(invoice.date_order).toLocaleDateString()}`);
    doc.moveDown(1);

    // Tabel Produk
    doc.fontSize(12).text('Detail Produk', {});
    doc.moveDown(0.5);

    // Header tabel
    const tableTop = doc.y;
    const itemSpacing = 20;
    const columnWidths = {
      no: 40,
      name: 200,
      size: 60,
      qty: 50,
      price: 100
    };

    doc.font('Helvetica-Bold');
    doc.text('No', 50, tableTop);
    doc.text('Produk', 90, tableTop);
    doc.text('Ukuran', 300, tableTop);
    doc.text('Qty', 370, tableTop);
    doc.text('Harga', 420, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    doc.font('Helvetica');
    let positionY = tableTop + 25;
    let totalHarga = 0;

    invoice.orders.forEach((order, i) => {
      const harga = parseInt(order.product_price);
      totalHarga += harga * order.product_qty;

      doc.text(i + 1, 50, positionY);
      doc.text(order.product_name, 90, positionY);
      doc.text(order.product_size, 300, positionY);
      doc.text(order.product_qty, 370, positionY);
      doc.text(`Rp ${harga.toLocaleString()}`, 420, positionY);
      positionY += itemSpacing;
    });

    doc.moveTo(50, positionY).lineTo(550, positionY).stroke();
    // var jml = invoice.total_price + invoice.shipping_price;
    // Total
    doc.font('Helvetica-Bold');
    doc.text(`Subtotal: Rp ${totalHarga.toLocaleString()}`, 350, positionY + 10);
    doc.text(`Ongkir: Rp ${invoice.shipping_price.toLocaleString()}`, 350, positionY + 30);
    doc.text(`Total: Rp ${invoice.total_price.toLocaleString()}`, 350, positionY + 50);
    doc.end();

  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

exports.updateShippingStatus = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const {
      status_shipping
    } = req.body;

    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        message: 'Invoice tidak ditemukan'
      });
    }

    invoice.status_shipping = status_shipping;
    await invoice.save();

    res.status(200).json({
      message: 'Status pengiriman berhasil diperbarui'
    });
  } catch (err) {
    console.error('Error updating shipping status:', err);
    res.status(500).json({
      error: 'Gagal memperbarui status'
    });
  }
};