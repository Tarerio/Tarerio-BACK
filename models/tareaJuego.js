const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TareaJuego = sequelize.define("TareaJuego", {
  ID_tarea: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  Fecha_estimada_cierre: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Enlace: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// TODO: Add relationships when Administrator is created
//TareaJuego.belongsTo(Administrador, { foreignKey: {name: 'creatorId',}});

module.exports = TareaJuego;
