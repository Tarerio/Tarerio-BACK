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
  Fecha_fin_asignacion: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  }
}, {
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

// Relación muchos a muchos con el modelo intermedio "se asigna"
Alumno.belongsToMany(TareaJuego, { through: AlumnoTareaJuego, foreignKey: 'id_usuario' });
TareaJuego.belongsToMany(Alumno, { through: AlumnoTareaJuego, foreignKey: 'ID_tarea' });

module.exports = AlumnoTareaJuego;