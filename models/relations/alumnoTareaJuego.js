const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Alumno = require('../student');
const TareaJuego = require('../tareaJuego');

const AlumnoTareaJuego = sequelize.define("AlumnoTareaJuego", {
  completado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  revisado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Relación muchos a muchos con el modelo intermedio "se asigna"
Alumno.belongsToMany(TareaJuego, { through: AlumnoTareaJuego });
TareaJuego.belongsToMany(Alumno, { through: AlumnoTareaJuego });

module.exports = AlumnoTareaJuego;
