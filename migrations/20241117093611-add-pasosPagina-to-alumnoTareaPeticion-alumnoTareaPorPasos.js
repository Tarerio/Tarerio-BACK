'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Comprobar y añadir columna pasosPagina a la tabla AlumnoTareaPeticion
    const alumnoTareaPeticionTable = await queryInterface.describeTable('AlumnoTareaPeticion');
    if (!alumnoTareaPeticionTable.pasosPagina) {
      await queryInterface.addColumn('AlumnoTareaPeticion', 'pasosPagina', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      });
    }

    // Comprobar y añadir columna pasosPagina a la tabla AlumnoTareaPorPasos
    const alumnoTareaPorPasosTable = await queryInterface.describeTable('AlumnoTareaPorPasos');
    if (!alumnoTareaPorPasosTable.pasosPagina) {
      await queryInterface.addColumn('AlumnoTareaPorPasos', 'pasosPagina', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Comprobar y eliminar columna pasosPagina de la tabla AlumnoTareaPeticion
    const alumnoTareaPeticionTable = await queryInterface.describeTable('AlumnoTareaPeticion');
    if (alumnoTareaPeticionTable.pasosPagina) {
      await queryInterface.removeColumn('AlumnoTareaPeticion', 'pasosPagina');
    }

    // Comprobar y eliminar columna pasosPagina de la tabla AlumnoTareaPorPasos
    const alumnoTareaPorPasosTable = await queryInterface.describeTable('AlumnoTareaPorPasos');
    if (alumnoTareaPorPasosTable.pasosPagina) {
      await queryInterface.removeColumn('AlumnoTareaPorPasos', 'pasosPagina');
    }
  }
};