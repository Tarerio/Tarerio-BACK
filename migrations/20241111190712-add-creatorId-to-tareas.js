'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Añadir columna creatorId a la tabla TareaPorPasos
    await queryInterface.addColumn('TareaPorPasos', 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Administradors', // Asegúrate de que esta tabla exista y tenga la columna id
        key: 'id_usuario'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Añadir columna creatorId a la tabla TareaPeticion
    await queryInterface.addColumn('TareaPeticion', 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Administradors', // Asegúrate de que esta tabla exista y tenga la columna id
        key: 'id_usuario'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Añadir columna creatorId a la tabla TareaJuego
    await queryInterface.addColumn('TareaJuego', 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Administradors', // Asegúrate de que esta tabla exista y tenga la columna id
        key: 'id_usuario'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // Eliminar columna creatorId de la tabla TareaPorPasos
    await queryInterface.removeColumn('TareaPorPasos', 'creatorId');

    // Eliminar columna creatorId de la tabla TareaPeticion
    await queryInterface.removeColumn('TareaPeticion', 'creatorId');

    // Eliminar columna creatorId de la tabla TareaJuego
    await queryInterface.removeColumn('TareaJuego', 'creatorId');
  }
};
