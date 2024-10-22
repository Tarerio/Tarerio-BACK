'use strict';

//Ejemplo de archivo de migración
//Crear una migración con 'sequelize migration:generate --name update-alumno-model'
//Se ejecuta con 'sequelize db:migrate'
//Se deshace con 'sequelize db:migrate:undo'(es como un rollback)
//Hacer refresh de la base de datos y volver a migrar todo con 'db:migrate:undo:all'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Alumnos', {
      id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      contrasenia: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Alumnos');
  }
};
