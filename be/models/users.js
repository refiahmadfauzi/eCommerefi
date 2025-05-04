module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    phone: { type: DataTypes.STRING, unique: true },
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    date_of_birth: DataTypes.DATEONLY
  }, {
    tableName: 'users',
    timestamps: false // karena kamu pakai `created_at` manual
  });
};
