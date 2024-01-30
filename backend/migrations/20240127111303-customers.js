'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const tableDescription = await queryInterface.describeTable('customers');

    // Define the existing table structure in the up function
    await queryInterface.createTable('customers', {
      // Define each column based on its name and definition
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the 'customers' table if the migration needs to be reverted
    await queryInterface.dropTable('customers');
  },
};
