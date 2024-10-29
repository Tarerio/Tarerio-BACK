'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Profesores', 'imagenBase64', {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Profesores', 'imagenBase64');
  }
};