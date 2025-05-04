module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    users_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_size_id: DataTypes.INTEGER,
    product_qty: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status_cart: DataTypes.STRING
  }, {
    tableName: 'cart',
    timestamps: false
  });
  Cart.associate = function (models) {
    Cart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'Product'
    });
  };
  Cart.associate = function (models) {
    Cart.belongsTo(models.ProductSize, {
      foreignKey: 'product_size_id',
      as: 'product_size'
    });
  };

  return Cart;

};