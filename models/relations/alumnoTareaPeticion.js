const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Alumno = require('../student');
const { TareaPeticion } = require('../tareaPeticion');

const AlumnoTareaPeticion = sequelize.define("AlumnoTareaPeticion", {
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
Alumno.belongsToMany(TareaPeticion, { through: AlumnoTareaPeticion, foreignKey: 'id_usuario' });
TareaPeticion.belongsToMany(Alumno, { through: AlumnoTareaPeticion, foreignKey: 'ID_tarea' });

module.exports = AlumnoTareaPeticion;