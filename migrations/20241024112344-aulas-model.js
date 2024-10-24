'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Aulas', {
        id_aula: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        clave_aula: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        cupo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: false
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
        }
      });
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Aulas');
  }
};
