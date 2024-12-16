'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Mensajes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_chat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_emisor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_receptor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tipo_emisor: {
        type: Sequelize.ENUM('administrador', 'alumno', 'profesor'),
        allowNull: false
      },
      tipo_receptor: {
        type: Sequelize.ENUM('administrador', 'alumno', 'profesor'),
        allowNull: false
      },
      mensaje: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      url_archivo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      tipo_mensaje: {
        type: Sequelize.ENUM('texto','pictogramas','imagenes','video'),
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM('enviado','recibido','leido'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Mensajes");
  }
};