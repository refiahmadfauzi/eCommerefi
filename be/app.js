const express = require('express');
const app = express();
const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');
const invoiceRoutes = require('./routes/invoice');

app.use(cors()); // <- Ini akan izinkan semua origin (termasuk 127.0.0.1:3000)
app.use(express.json());

// app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', paymentRoutes);
app.use('/api', invoiceRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
