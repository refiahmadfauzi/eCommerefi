module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    price: DataTypes.FLOAT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'product',
    timestamps: false
  });
};
