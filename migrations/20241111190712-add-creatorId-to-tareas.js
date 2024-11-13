'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Comprobar y añadir columna creatorId a la tabla TareaPorPasos
    const tareaPorPasosTable = await queryInterface.describeTable('TareaPorPasos');
    if (!tareaPorPasosTable.creatorId) {
      await queryInterface.addColumn('TareaPorPasos', 'creatorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'administradores', // Asegúrate de que esta tabla exista y tenga la columna id_usuario
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    // Comprobar y añadir columna creatorId a la tabla TareaPeticion
    const tareaPeticionTable = await queryInterface.describeTable('TareaPeticion');
    if (!tareaPeticionTable.creatorId) {
      await queryInterface.addColumn('TareaPeticion', 'creatorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'administradores', // Asegúrate de que esta tabla exista y tenga la columna id_usuario
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    // Comprobar y añadir columna creatorId a la tabla TareaJuego
    const tareaJuegoTable = await queryInterface.describeTable('TareaJuego');
    if (!tareaJuegoTable.creatorId) {
      await queryInterface.addColumn('TareaJuego', 'creatorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'administradores', // Asegúrate de que esta tabla exista y tenga la columna id_usuario
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Eliminar columna creatorId de la tabla TareaPorPasos
    const tareaPorPasosTable = await queryInterface.describeTable('TareaPorPasos');
    if (tareaPorPasosTable.creatorId) {
      await queryInterface.removeColumn('TareaPorPasos', 'creatorId');
    }

    // Eliminar columna creatorId de la tabla TareaPeticion
    const tareaPeticionTable = await queryInterface.describeTable('TareaPeticion');
    if (tareaPeticionTable.creatorId) {
      await queryInterface.removeColumn('TareaPeticion', 'creatorId');
    }

    // Eliminar columna creatorId de la tabla TareaJuego
    const tareaJuegoTable = await queryInterface.describeTable('TareaJuego');
    if (tareaJuegoTable.creatorId) {
      await queryInterface.removeColumn('TareaJuego', 'creatorId');
    }
  }
};