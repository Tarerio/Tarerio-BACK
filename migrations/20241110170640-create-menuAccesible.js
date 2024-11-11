'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('MenuAccesibles', {
      id_menu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Alumnos',
          key: 'nickname'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      texto_titulo: {
        type: Sequelize.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE', 'GRANDE+'),
        allowNull: false,
        defaultValue: 'MEDIANO'
      },
      texto_descripcion: {
        type: Sequelize.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE', 'GRANDE+'),
        allowNull: false,
        defaultValue: 'MEDIANO'
      },
      paleta_colores: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'TARERIO'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuAccesibles');
  }
};