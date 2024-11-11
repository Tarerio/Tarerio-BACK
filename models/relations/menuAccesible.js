// models/menuAccesible.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Alumno = require('../student');

const MenuAccesible = sequelize.define('MenuAccesible', {
    id_menu: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Alumno,
            key: 'nickname'
        }
    },
    texto_titulo: {
        type: DataTypes.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE', 'GRANDE+'),
        allowNull: false,
        defaultValue: 'MEDIANO'
    },
    texto_descripcion: {
        type: DataTypes.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE', 'GRANDE+'),
        allowNull: false,
        defaultValue: 'MEDIANO'
    },
    paleta_colores: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'TARERIO'
    }
});

Alumno.hasOne(MenuAccesible, { foreignKey: 'nickname' });
MenuAccesible.belongsTo(Alumno, { foreignKey: 'nickname' });

module.exports = MenuAccesible;