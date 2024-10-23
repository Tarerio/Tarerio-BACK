const Profesor = require('../models/teacher');
const bcrypt = require('bcrypt');

//GET
// http://localhost:3000/profesores
exports.listarProfesores = (req, res) => {
    Profesor.findAll().then(users => {
        res.status(200).json({
            status: 'success',
            message: 'Profesores obtenidos correctamente',
            usuarios: users,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los profesores',
            error: err
        });
    });
}

//GET
// http://localhost:3000/profesores/:id_usuario
exports.obtenerProfesor = async (req, res) => {
    const { id_usuario } = req.params;

    Profesor.findOne({
        where: { id_usuario }
    }).then(teacher => {
        if (!teacher) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Profesor obtenido correctamente',
                profesor: teacher,
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el profesor',
            error: err
        });
    });

};

//POST
// http://localhost:3000/profesores/create
exports.registrarProfesor = async (req, res) => {
    const { nickname, patron} = req.body;


    if (!nickname || !patron || patron.length < 8) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Nickname, contraseña son requeridos y la contraseña debe tener al menos 8 caracteres' 
        });
    }

    const coste = 1; // Puedes ajustar el costo de hashing (más alto = más seguro, pero más lento)
    const hashedPatron = await bcrypt.hash(patron, coste);

    Profesor.create({
        nickname: nickname,
        contrasenia: hashedPatron,
    }).then(teacher => {
        res.status(201).json({
            status: 'success',
            message: 'Profesor creado correctamente',
            profesor: teacher,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el profesor',
            error: err
        });
    });
};

//PUT
// http://localhost:3000/profesores/:id_usuario
exports.actualizarProfesor = (req, res) => {
    const { nickname, patron } = req.body;
    const { id_usuario } = req.params;

    if(patron.length < 8) {
        return res.status(400).json({ 
            status: 'error',
            message: 'La contraseña debe tener al menos 8 caracteres' 
        });
    }

    Profesor.findOne({
        where: { id_usuario }
    }).then(teacher => {
        if (!teacher) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor que se quiere actualizar'
            });
        }

        return teacher.update({
            nickname: nickname,
            contrasenia: patron,
        });
    }).then(updatedTeacher => {
        res.status(201).json({
            status: 'success',
            message: 'Profesor actualizado correctamente',
            profesor: updatedTeacher
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el profesor',
            error: err
        });
    });
};

//DELETE
// http://localhost:3000/profesores/:id_usuario
exports.eliminarProfesor = (req, res) => {
    const { id_usuario } = req.params;

    Profesor.destroy({
        where: { id_usuario }
    }).then(deletedRows => {
        if (!deletedRows) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor que se quiere eliminar'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Profesor eliminado correctamente'
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el profesor',
            error: err
        });
    });
}