const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models
db.Users = require('./users')(sequelize, Sequelize.DataTypes);
db.Admins = require('./admins')(sequelize, Sequelize.DataTypes);
db.CardUser = require('./card_user')(sequelize, Sequelize.DataTypes);
db.Product = require('./product')(sequelize, Sequelize.DataTypes);
db.ProductSize = require('./product_size')(sequelize, Sequelize.DataTypes);
db.Cart = require('./cart')(sequelize, Sequelize.DataTypes);
db.HistoryOrder = require('./history_order')(sequelize, Sequelize.DataTypes);
db.Invoice = require('./invoice')(sequelize, Sequelize.DataTypes);

// Setup relations
db.Users.hasMany(db.CardUser, {
    foreignKey: 'users_id'
});
db.CardUser.belongsTo(db.Users, {
    foreignKey: 'users_id'
});

db.Users.hasMany(db.Cart, {
    foreignKey: 'users_id'
});
db.Cart.belongsTo(db.Users, {
    foreignKey: 'users_id'
});

db.Product.hasMany(db.ProductSize, {
    foreignKey: 'product_id'
});
db.ProductSize.belongsTo(db.Product, {
    foreignKey: 'product_id'
});
// Tambahan relasi eksplisit (jika belum ditulis di masing-masing file model)
db.Cart.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'Product'
});
db.Product.hasMany(db.Cart, {
    foreignKey: 'product_id'
});

db.Cart.belongsTo(db.Product, {
    foreignKey: 'product_id'
});
db.Cart.belongsTo(db.ProductSize, {
    foreignKey: 'product_size_id'
});

db.Users.hasMany(db.HistoryOrder, {
    foreignKey: 'users_id'
});
db.HistoryOrder.belongsTo(db.Users, {
    foreignKey: 'users_id'
});

db.HistoryOrder.belongsTo(db.Cart, {
    foreignKey: 'cart_id'
});
db.HistoryOrder.belongsTo(db.Invoice, {
    foreignKey: 'invoice_id'
});

db.Invoice.hasMany(db.HistoryOrder, {
    foreignKey: 'invoice_id',
    as: 'orders'
});

db.HistoryOrder.belongsTo(db.Invoice, {
    foreignKey: 'invoice_id'
});
db.Invoice.belongsTo(db.Users, {
    as: 'user',
    foreignKey: 'users_id'
});
db.Users.hasMany(db.Invoice, {
    as: 'invoices',
    foreignKey: 'users_id'
});




module.exports = db;