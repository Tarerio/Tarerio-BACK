'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Verificar si la columna ya existe antes de añadirla
    const tableInfo = await queryInterface.describeTable('Profesores');
    if (!tableInfo.imagenBase64) {
      await queryInterface.addColumn('Profesores', 'imagenBase64', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Profesores', 'imagenBase64');
  }
};