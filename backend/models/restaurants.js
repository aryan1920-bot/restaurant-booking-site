module.exports = (sequelize, DataTypes) => {
    const Restaurants = sequelize.define('Restaurants', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
        },
        location: {
          type: DataTypes.STRING,
        },
        cuisine_type: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
          alloNull:false,
          field:"created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          alloNull:false,
          field:" updated_at",
        },
      });
      
      return Restaurants
}