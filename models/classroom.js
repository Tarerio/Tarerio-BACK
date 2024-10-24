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
});

module.exports = Aula;