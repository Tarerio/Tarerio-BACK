'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Aulas');
    if (!tableInfo.imagenBase64) {
      await queryInterface.addColumn('Aulas', 'imagenBase64', {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Aulas', 'imagenBase64');
  }
};
