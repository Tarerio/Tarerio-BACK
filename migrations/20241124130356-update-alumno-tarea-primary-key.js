'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Eliminar la clave primaria existente
    await queryInterface.removeConstraint('AlumnoTareaJuego', 'AlumnoTareaJuego_pkey');
    await queryInterface.removeConstraint('AlumnoTareaPeticion', 'AlumnoTareaPeticion_pkey');
    await queryInterface.removeConstraint('AlumnoTareaPorPasos', 'AlumnoTareaPorPasos_pkey');

    // 2. Añadir una nueva clave primaria compuesta
    await queryInterface.addConstraint('AlumnoTareaJuego', {
      fields: ['id_usuario', 'ID_tarea', 'Fecha_fin_asignacion'],
      type: 'primary key',
      name: 'AlumnoTareaJuego_composite_pkey', // Nombre de la nueva clave primaria
    });
  
    await queryInterface.addConstraint('AlumnoTareaPeticion', {
      fields: ['id_usuario', 'ID_tarea', 'Fecha_fin_asignacion'],
      type: 'primary key',
      name: 'AlumnoTareaPeticion_composite_pkey', // Nombre de la nueva clave primaria
    });
  
    await queryInterface.addConstraint('AlumnoTareaPorPasos', {
      fields: ['id_usuario', 'ID_tarea', 'Fecha_fin_asignacion'],
      type: 'primary key',
      name: 'AlumnoTareaPorPasos_composite_pkey', // Nombre de la nueva clave primaria
    });
  },

  async down (queryInterface, Sequelize) {
    // 1. Eliminar la clave primaria compuesta
    await queryInterface.removeConstraint('AlumnoTareaJuego', 'AlumnoTareaJuego_composite_pkey');
    await queryInterface.removeConstraint('AlumnoTareaPeticion', 'AlumnoTareaPeticion_composite_pkey');
    await queryInterface.removeConstraint('AlumnoTareaPorPasos', 'AlumnoTareaPorPasos_composite_pkey');

    // 2. Restaurar la clave primaria anterior
    await queryInterface.addConstraint('AlumnoTareaJuego', {
      fields: ['id_usuario', 'ID_tarea'],
      type: 'primary key',
      name: 'AlumnoTareaJuego_pkey', // Nombre original de la clave primaria
    });
    await queryInterface.addConstraint('AlumnoTareaPeticion', {
      fields: ['id_usuario', 'ID_tarea'],
      type: 'primary key',
      name: 'AlumnoTareaPeticion_pkey', // Nombre original de la clave primaria
    });
    await queryInterface.addConstraint('AlumnoTareaPorPasos', {
      fields: ['id_usuario', 'ID_tarea'],
      type: 'primary key',
      name: 'AlumnoTareaPorPasos_pkey', // Nombre original de la clave primaria
    });
  }
};
