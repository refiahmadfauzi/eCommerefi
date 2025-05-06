module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    recipt: DataTypes.STRING,
    status_shipping: DataTypes.STRING,
    shipping_price: DataTypes.INTEGER,
    date_shipping: DataTypes.DATE,
    date_order: DataTypes.DATE,
    total_price: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER,
    id_card: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: 'Invoice',
    timestamps: false
  });
};