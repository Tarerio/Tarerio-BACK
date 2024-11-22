'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Comprobar y añadir columno imagenBase64 a la tabla TareaPorPasos
    const tareaPorPasosTable = await queryInterface.describeTable('TareaPorPasos');
    if (!tareaPorPasosTable.imagenBase64) {
      await queryInterface.addColumn('TareaPorPasos', 'imagenBase64', {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      });
    }

    // Comprobar y añadir columno imagenBase64 a la tabla TareaPeticion
    const tareaPeticionTable = await queryInterface.describeTable('TareaPeticion');
    if (!tareaPeticionTable.imagenBase64) {
      await queryInterface.addColumn('TareaPeticion', 'imagenBase64', {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      });
    }

    // Comprobar y añadir columno imagenBase64 a la tabla TareaJuego
    const tareaJuegoTable = await queryInterface.describeTable('TareaJuego');
    if (!tareaJuegoTable.imagenBase64) {
      await queryInterface.addColumn('TareaJuego', 'imagenBase64', {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      });
    }

  },

  async down(queryInterface, Sequelize) {
    // Eliminar columna imagenBase64 de la tabla TareaPorPasos
    const tareaPorPasosTable = await queryInterface.describeTable('TareaPorPasos');
    if (tareaPorPasosTable.imagenBase64) {
      await queryInterface.removeColumn('TareaPorPasos', 'imagenBase64');
    }

    // Eliminar columna imagenBase64 de la tabla TareaPeticion
    const tareaPeticionTable = await queryInterface.describeTable('TareaPeticion');
    if (tareaPeticionTable.imagenBase64) {
      await queryInterface.removeColumn('TareaPeticion', 'imagenBase64');
    }

    // Eliminar columna imagenBase64 de la tabla TareaJuego
    const tareaJuegoTable = await queryInterface.describeTable('TareaJuego');
    if (tareaJuegoTable.imagenBase64) {
      await queryInterface.removeColumn('TareaJuego', 'imagenBase64');
    }
  }
};