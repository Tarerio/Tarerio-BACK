'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('AlumnoTareaPorPasos', 'Fecha_fin_asignacion', {
      type: Sequelize.DATE,
      allowNull: false,
      unique: false,
    });

    await queryInterface.addColumn('AlumnoTareaPeticion', 'Fecha_fin_asignacion', {
      type: Sequelize.DATE,
      allowNull: false,
      unique: false,
    });

    await queryInterface.addColumn('AlumnoTareaJuego', 'Fecha_fin_asignacion', {
      type: Sequelize.DATE,
      allowNull: false,
      unique: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('AlumnoTareaPorPasos', 'Fecha_fin_asignacion');
    await queryInterface.removeColumn('AlumnoTareaPeticion', 'Fecha_fin_asignacion');
    await queryInterface.removeColumn('AlumnoTareaJuego', 'Fecha_fin_asignacion');
  }
};
