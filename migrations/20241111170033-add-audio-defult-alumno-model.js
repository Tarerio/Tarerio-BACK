'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Alumnos');
    if (!tableInfo.audio) {
      await queryInterface.addColumn('Alumnos', 'audio', {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          unique: false
      });
    }
    if(!tableInfo.porDefecto){
      await queryInterface.addColumn('Alumnos', 'porDefecto', {
        type: Sequelize.ENUM('audio', 'video', 'pictograma', 'texto', 'imagenes'),
        allowNull: true,
        unique: false,
        defaultValue: 'texto'
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Alumnos', 'audio');
    await queryInterface.removeColumn('Alumnos', 'porDefecto');
  }
};
