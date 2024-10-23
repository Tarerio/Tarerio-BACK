const {DataTypes} = require ('sequelize');
const sequelize = require('../config/database');

const Profesor = sequelize.define(
    'Profesor', 
        {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contrasenia:{
            type: DataTypes.STRING,
            allowNUll: false
        },
        
    },{
        freezeTableName: true,
    }
);

module.exports = Profesor;