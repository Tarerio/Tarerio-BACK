const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Administrador = require("./admin");

// ===================================================================
//                        Modelo TareaPorPasos
// ===================================================================
const TareaPorPasos = sequelize.define("TareaPorPasos", {
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
//                          Modelo Subtarea
// ===================================================================
const Subtarea = sequelize.define("Subtarea", {
  ID_subtarea: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Texto: {
    type: DataTypes.STRING,
    allowNull: true, // Texto descriptivo de la subtarea
  },
  Imagen: {
    type: DataTypes.STRING, // Imagen
    allowNull: true,
  },
  Pictograma: {
    type: DataTypes.STRING, // Pictograma
    allowNull: true,
  },
  Video: {
    type: DataTypes.STRING, // Video
    allowNull: true,
  },
});

// ===================================================================
//                    Ralaciones entre modelos
// ===================================================================

TareaPorPasos.belongsTo(Administrador, { foreignKey: {name: 'creatorId',}});

TareaPorPasos.hasMany(Subtarea, {
  foreignKey: { name: "ID_tarea", allowNull: false },
  onDelete: "CASCADE", // Elimina las subtareas cuando se elimina una tarea
});

Subtarea.belongsTo(TareaPorPasos, {
  foreignKey: { name: "ID_tarea", allowNull: false },
});


// Exportar los modelos
module.exports = { TareaPorPasos, Subtarea };
