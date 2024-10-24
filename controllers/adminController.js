const Administrador = require('../models/admin');
const bcrypt = require('bcrypt');


//POST
// http://localhost:3000/administradores/create
exports.registrarAdmin = async (req, res) => {
    const { nickname, contrasenia} = req.body;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/;


    if (!nickname || !contrasenia) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Nickname y contraseña son requeridos' 
        });
    }else if(contrasenia.length < 8){
        return res.status(400).json({ 
            status: 'error',
            message: 'La contraseña debe tener al menos 8 caracteres'
        });
    }else if (!regex.test(contrasenia)) {
        return res.status(400).json({
            status: 'error',
            message: 'La contraseña debe contener al menos una mayúscula, un número y un carácter especial'
        });
    }

    const coste = 1; // Puedes ajustar el costo de hashing (más alto = más seguro, pero más lento)
    const hashedPatron = await bcrypt.hash(contrasenia, coste);

    Administrador.create({
        nickname: nickname,
        contrasenia: hashedPatron,
    }).then(admin => {
        res.status(201).json({
            status: 'success',
            message: 'Admin creado correctamente',
            administrador: admin,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el admin',
            error: err
        });
    });
};

//POST
// http://localhost:3000/administradores/inicioSesionAdministrador
exports.inicioSesionAdmin = async (req, res) => {
    const { nickname, contrasenia } = req.body;

    if (!nickname || !contrasenia) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Nickname y contraseña son requeridos' 
        });
    }

    Administrador.findOne({
        where: { nickname }
    }).then(async admin => {
        if (!admin) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el admin'
            });
        }

        const contraseniaValida = await bcrypt.compare(contrasenia, admin.contrasenia);

        if (!contraseniaValida) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión correcto',
            administrador: admin
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al iniciar sesión',
            error: err
        });
    });
}