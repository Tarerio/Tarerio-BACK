'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Profesores', 'imagenBase64', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Profesores', 'imagenBase64', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};