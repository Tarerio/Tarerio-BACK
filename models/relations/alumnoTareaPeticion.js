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
    primaryKey: true, // Incluido como parte de la clave primaria
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Incluido como parte de la clave primaria
    references: {
      model: Alumno,
      key: 'id_usuario',
    },
  },
  ID_tarea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Incluido como parte de la clave primaria
    references: {
      model: TareaPeticion,
      key: 'ID_tarea',
    },
  },
  pasosPagina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
  timestamps: true,
});

module.exports = AlumnoTareaPeticion;