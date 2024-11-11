'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Alumnos');
    if (!tableInfo.id_aula) {
      await queryInterface.addColumn('Alumnos', 'id_aula', {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Alumnos', 'id_aula');
  }
};
