const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alumno = sequelize.define('Alumno', {
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
    unique: true
  },
  texto: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    unique: false
  },
  imagenes: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    unique: false
  },
  pictograma: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    unique: false
  },
  video: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    unique: false
  },
  audio: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    unique: false
  },
  porDefecto: {
    type: DataTypes.ENUM('audio', 'video', 'pictograma', 'texto', 'imagenes'),
    allowNull: true,
    unique: false,
    defaultValue: 'texto'
  },
  imagenBase64: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false
  }
}, {
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

module.exports = Alumno;