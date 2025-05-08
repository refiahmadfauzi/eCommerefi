module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CardUser', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name_users: DataTypes.STRING,
      card_number: DataTypes.STRING,
      bank_name: DataTypes.STRING,
      expired_card: DataTypes.STRING,
      is_deleted: DataTypes.INTEGER,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      users_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    }, {
      tableName: 'card_users',
      timestamps: false
    });
  };
  