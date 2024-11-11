const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Alumno = require('../student');
const { TareaPorPasos } = require('../tareaPorPasos');

const AlumnoTareaPorPasos = sequelize.define("AlumnoTareaPorPasos", {
    completado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    revisado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

// Relación muchos a muchos con el modelo intermedio "se asigna"
Alumno.belongsToMany(TareaPorPasos, { through: AlumnoTareaPorPasos, foreignKey: 'id_usuario' });
TareaPorPasos.belongsToMany(Alumno, { through: AlumnoTareaPorPasos, foreignKey: 'ID_tarea' });

module.exports = AlumnoTareaPorPasos;
