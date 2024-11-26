// models/menuAccesible.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Profesor = require('../teacher');

const PedidoMaterial = sequelize.define('PedidoMaterial', {
    id_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Profesor,
            key: 'nickname'
        }
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Pedido'),
        allowNull: false,
        defaultValue: 'Pendiente'
    },
    materiales: {
        type: DataTypes.JSON,
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
    }
}, {
    freezeTableName: true,
    timestamps: true,
});

Profesor.hasMany(PedidoMaterial, { foreignKey: 'nickname' }); // Un profesor puede tener varios pedidos
PedidoMaterial.belongsTo(Profesor, { foreignKey: 'nickname' }); // Un pedido pertenece a un profesor

module.exports = PedidoMaterial;