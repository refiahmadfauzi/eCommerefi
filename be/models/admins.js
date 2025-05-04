module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admins', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      tableName: 'admin',
      timestamps: false
    });
  };
  