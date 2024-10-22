const User = require('../models/user');

// Métodos CRUD...

exports.inicioSesionAlumno = (req, res) => {
    // Simulación de inicio de sesión
    const { patron } = req.query;

    /* insertar usuario de prueba

     User.create({
        nickname: 'paquito galaxia',
        contrasenia: 'D2D0D2D0'
    }).then(user => {
        console.log('Usuario creado:', user);
    }).catch(err => {
        console.error('Error al crear el usuario:', err);
    });*/    

    // Ver si ese patrón existe en el sistema, si existe, entonces inicio de sesión exitoso

    User.findOne({
        where: {
            contrasenia: patron
        }
    }).then(user => {
        if (user) {
            res.status(200).json({ message: 'Inicio de sesión exitoso, el patrón existe en el sistema', usuario : user });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }).catch(err => {
        console.error('Error al buscar el usuario:', err);
        res.status(500).json({ message: 'Error al buscar el usuario' });
    });

};