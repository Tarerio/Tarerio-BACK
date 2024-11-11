'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Crear tabla AlumnoTareaPeticion
    await queryInterface.createTable('AlumnoTareaPeticion', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_tarea: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TareaPeticions',
          key: 'id_tarea'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      completado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      revisado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

    // Crear tabla AlumnoTareaPorPasos
    await queryInterface.createTable('AlumnoTareaPorPasos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_tarea: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TareaPorPasos',
          key: 'id_tarea'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      completado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      revisado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('AlumnoTareaPeticion');
    await queryInterface.dropTable('AlumnoTareaPorPasos');
  }
};