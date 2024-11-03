const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Administrador = require("./admin");
const Alumno = require("./student");

// ===================================================================
//                        Modelo TareaPeticion
// ===================================================================
const TareaPeticion = sequelize.define("TareaPeticion", {
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
});

// ===================================================================
//                          Modelo Enunciado
// ===================================================================
const Enunciado = sequelize.define("Enunciado", {
  ID_enunciado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Imagen: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Video: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// ===================================================================
//                          Modelo Respuesta
// ===================================================================
const Respuesta = sequelize.define("Respuesta", {
  ID_respuesta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Respuesta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Realizado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

// ===================================================================
//                    Ralaciones entre modelos
// ===================================================================

// Administrador - TareaPeticion
//TareaPeticion.belongsTo(Administrador, { foreignKey: { name: 'creatorId', } });

// TareaPeticion - Enunciado
TareaPeticion.hasMany(Enunciado, {
  foreignKey: { name: "ID_tarea", as: "Enunciados", allowNull: false },
  onDelete: "CASCADE", // Se eliminan los enunciados si se elimina la tarea
});

Enunciado.belongsTo(TareaPeticion, { 
  foreignKey:  { name: "ID_tarea", as: "tareaPeticion", allowNull: false },
});

// Enunciado - Respuesta
Enunciado.hasOne(Respuesta, {
  foreignKey: { name: 'ID_enunciado', allowNull: false },
  as: "Respuesta", 
  onDelete: 'CASCADE', // Se elimina la respuesta si se elimina el enunciado
});

Respuesta.belongsTo(Enunciado, {
  foreignKey: { name: 'ID_enunciado', allowNull: false },
   as: "Enunciado",
});

// Alumno - Respuesta
Alumno.hasMany(Respuesta, {
  foreignKey: { name: 'id_usuario', allowNull: false },
});

Respuesta.belongsTo(Alumno, {
  foreignKey: { name: 'id_usuario', allowNull: false },
});

// Exportar los modelos
module.exports = { TareaPeticion , Enunciado, Respuesta };
