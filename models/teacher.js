const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/*
{
    "nickname" : "Pepe",
    "patron" : "12345678@P"
}
*/    

const Profesor = sequelize.define('Profesor', {
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
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
});

module.exports = Profesor;