const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Messages = sequelize.define('Mensajes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_chat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_emisor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_receptor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_emisor: {
        type: DataTypes.ENUM('administrador', 'alumno', 'profesor'),
        allowNull: false
    },
    tipo_receptor: {
        type: DataTypes.ENUM('administrador', 'alumno', 'profesor'),
        allowNull: false
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    url_archivo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    tipo_mensaje: {
        type: DataTypes.ENUM('texto', 'pictogramas', 'imagenes', 'video'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('enviado', 'recibido', 'leido'),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

Messages.associate = function (models) {
    Messages.belongsTo(models.Administradores, {
        foreignKey: { name: 'id_emisor'},
        constraints: true,
        scope: {
            tipo_emisor: 'administrador'
        }
    });

    Messages.belongsTo(models.Alumnos, {
        foreignKey: { name: 'id_emisor'},
        constraints: true,
        scope: {
            tipo_emisor: 'alumno'
        }
    });

    Messages.belongsTo(models.Profesores, {
        foreignKey: { name: 'id_emisor'},
        constraints: true,
        scope: {
            tipo_emisor: 'profesor'
        }
    });

    Messages.belongsTo(models.Administradores, {
        foreignKey: { name: 'id_receptor'},
        constraints: true,
        scope: {
            tipo_receptor: 'administrador'
        }
    });

    Messages.belongsTo(models.Alumnos, {
        foreignKey: { name: 'id_receptor'},
        constraints: true,
        scope: {
            tipo_receptor: 'alumno'
        }
    });

    Messages.belongsTo(models.Profesores, {
        foreignKey: { name: 'id_receptor'},
        constraints: true,
        scope: {
            tipo_receptor: 'profesor'
        }
    });
};

module.exports = Messages;