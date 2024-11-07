const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aula = sequelize.define('Aula', {
  id_aula: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  clave_aula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cupo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false
  },
  imagenBase64: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false
  }
});

module.exports = Aula;