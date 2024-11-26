'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tableName = 'PedidoMaterial';

    // Verificar si la tabla ya existe
    const tableExists = await queryInterface.sequelize.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '${tableName}'
      );`
    );

    if (!tableExists[0][0].exists) {
      await queryInterface.createTable(tableName, {
        id_pedido: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'Profesores', // Asegúrate de que esta tabla exista y tenga la columna nickname
            key: 'nickname'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        fecha_pedido: {
          type: Sequelize.DATE,
          allowNull: false
        },
        estado: {
          type: Sequelize.ENUM('Pendiente', 'Pedido'),
          allowNull: false,
          defaultValue: 'Pendiente'
        },
        materiales: {
          type: Sequelize.JSON,
          allowNull: false,
          validate: {
            isValidFormat(value) {
              if (!Array.isArray(value)) {
                throw new Error('El campo materiales debe ser un array de objetos');
              }
              value.forEach(material => {
                if (!material.nombre || !material.cantidad) {
                  throw new Error('Cada material debe tener un nombre y una cantidad');
                }
              });
            }
          }
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
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PedidoMaterial');
  }
};
