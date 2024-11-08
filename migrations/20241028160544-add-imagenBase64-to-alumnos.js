'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Alumnos');
    if (!tableInfo.imagenBase64) {
      await queryInterface.addColumn('Alumnos', 'imagenBase64', {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Alumnos', 'imagenBase64');
  }
};