module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id',
      },
      allowNull: false,
    },
    slot_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Slots',
        key: 'id',
      },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  }, {
    timestamps: true,
    underscored: true, // This ensures that Sequelize uses snake_case for column names
  });

  return Inventory;
};
