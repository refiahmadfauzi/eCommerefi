// controllers/productController.js
const { Product,ProductSize } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      const whereClause = search
        ? {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
            ]
          }
        : {};
  
      const { count, rows } = await Product.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
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

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const photo = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      description,
      photo,
      price,
      created_at: new Date()
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Cari produk
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Hapus file lama jika upload file baru
    if (req.file) {
     // Cek jika ada photo lama dan bukan null
      if (product.photo) {
        const oldPhotoPath = path.join(__dirname, '../uploads', product.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      // Simpan photo baru
      product.photo = req.file.filename;
    }

    // Update field lain
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari produk berdasarkan ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Hapus file foto jika ada
    if (product.photo) {
      const photoPath = path.join(__dirname, '../uploads', product.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    // Hapus dari database
    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createProductSize = async (req, res) => {
  try {
    const { product_id, product_size, product_qty } = req.body;
    
    const product = await ProductSize.create({
      product_id,
      product_size,
      product_qty,
      created_at: new Date()
    });

    res.status(201).json({ message: 'Product Size created successfully', product });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProductSize = async (req, res) => {
  try {
    const userId = req.params.id;
    const { product_id, product_size, product_qty } = req.body;

    // Cari produk
    const product = await ProductSize.findByPk(userId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({
      product_id,
      product_size,
      product_qty,
    });

    res.status(200).json({ message: 'Product Size updated successfully', product });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProductSize = async (req, res) => {
  try {
    const userId = req.params.id;

    const product = await ProductSize.findByPk(userId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Product Size deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductSize = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      const whereClause = search
        ? {
            [Op.or]: [
              { product_id: { [Op.like]: `%${search}%` } },
            ]
          }
        : {};
  
      const { count, rows } = await ProductSize.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
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
