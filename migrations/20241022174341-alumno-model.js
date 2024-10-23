'use strict';

//Ejemplo de archivo de migración
//Crear una migración con 'sequelize migration:generate --name 'nombre_modelo'-model'
//Se ejecuta con 'sequelize db:migrate'
//Se deshace con 'sequelize db:migrate:undo'(es opcional ya que es como un rollback)

//Elimina todas las tablas'sequelize db:migrate:undo:all'

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
      texto:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        unique: false
      },
      imagenes:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        unique: false
      },
      pictograma:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        unique: false
      },
      video:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        unique: false
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
