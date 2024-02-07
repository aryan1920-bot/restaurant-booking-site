module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
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
      start_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        alloNull:false,
        field:"created_at",
        timestamps: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        alloNull:false,
        field:" updated_at",
        timestamps: true,
      },
    });
    Slot.associate = (models) => {
      Slot.belongsTo(models.Restaurants, { foreignKey: 'restaurant_id' });
    };
    return Slot
}