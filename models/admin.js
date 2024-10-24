const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/*
{
    "nickname":"juani",
    "contrasenia":"@Jefadetaller1"
}
*/

const Administrador = sequelize.define('Administrador', {
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

module.exports = Administrador;