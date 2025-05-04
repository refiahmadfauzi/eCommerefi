module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProductSize', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: DataTypes.INTEGER,
      product_size: DataTypes.STRING,
      product_qty: DataTypes.INTEGER,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
      tableName: 'product_size',
      timestamps: false
    });
  };
  