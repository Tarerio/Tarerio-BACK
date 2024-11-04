const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Aula = require('../classroom'); 
const Profesor = require('../teacher');

const AulaProfesor = sequelize.define('AulaProfesor', {}, {
  freezeTableName: true,
});


Profesor.belongsToMany(Aula, { through: AulaProfesor, foreignKey: 'id_usuario' });
Aula.belongsToMany(Profesor, { through: AulaProfesor, foreignKey: 'id_aula' });

module.exports = AulaProfesor;