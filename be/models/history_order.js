module.exports = (sequelize, DataTypes) => {
    return sequelize.define('HistoryOrder', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      cart_id: DataTypes.INTEGER,
      users_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      product_size_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_size: DataTypes.STRING,
      product_qty: DataTypes.INTEGER,
      product_price: DataTypes.FLOAT,
      invoice_id: DataTypes.INTEGER,
    }, {
      tableName: 'history_order',
      timestamps: false
    });
  };
  