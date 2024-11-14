'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Comprobar y añadir columna Fecha_fin_asignacion a la tabla AlumnoTareaPorPasos
    const alumnoTareaPorPasosTable = await queryInterface.describeTable('AlumnoTareaPorPasos');
    if (!alumnoTareaPorPasosTable.Fecha_fin_asignacion) {
      await queryInterface.addColumn('AlumnoTareaPorPasos', 'Fecha_fin_asignacion', {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
      });
    }

    // Comprobar y añadir columna Fecha_fin_asignacion a la tabla AlumnoTareaPeticion
    const alumnoTareaPeticionTable = await queryInterface.describeTable('AlumnoTareaPeticion');
    if (!alumnoTareaPeticionTable.Fecha_fin_asignacion) {
      await queryInterface.addColumn('AlumnoTareaPeticion', 'Fecha_fin_asignacion', {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
      });
    }

    // Comprobar y añadir columna Fecha_fin_asignacion a la tabla AlumnoTareaJuego
    const alumnoTareaJuegoTable = await queryInterface.describeTable('AlumnoTareaJuego');
    if (!alumnoTareaJuegoTable.Fecha_fin_asignacion) {
      await queryInterface.addColumn('AlumnoTareaJuego', 'Fecha_fin_asignacion', {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Comprobar y eliminar columna Fecha_fin_asignacion de la tabla AlumnoTareaPorPasos
    const alumnoTareaPorPasosTable = await queryInterface.describeTable('AlumnoTareaPorPasos');
    if (alumnoTareaPorPasosTable.Fecha_fin_asignacion) {
      await queryInterface.removeColumn('AlumnoTareaPorPasos', 'Fecha_fin_asignacion');
    }

    // Comprobar y eliminar columna Fecha_fin_asignacion de la tabla AlumnoTareaPeticion
    const alumnoTareaPeticionTable = await queryInterface.describeTable('AlumnoTareaPeticion');
    if (alumnoTareaPeticionTable.Fecha_fin_asignacion) {
      await queryInterface.removeColumn('AlumnoTareaPeticion', 'Fecha_fin_asignacion');
    }

    // Comprobar y eliminar columna Fecha_fin_asignacion de la tabla AlumnoTareaJuego
    const alumnoTareaJuegoTable = await queryInterface.describeTable('AlumnoTareaJuego');
    if (alumnoTareaJuegoTable.Fecha_fin_asignacion) {
      await queryInterface.removeColumn('AlumnoTareaJuego', 'Fecha_fin_asignacion');
    }
  }
};