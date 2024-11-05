const Alumno = require('../models/student');

// POST iniciar sesión pasando en el cuerpo de la solicitud nickname y patron
// http://localhost:3000/alumnos/inicioSesionAlumno

exports.inicioSesionAlumno = (req, res) => {
    // Simulación de inicio de sesión
    const { nickname, patron } = req.body;

    // Ver si el nickname y el patrón existen en el sistema, si existen, entonces inicio de sesión exitoso
    Alumno.findOne({
        where: {
            nickname: nickname,
            contrasenia: patron
        }
    }).then(alumno => {
        if (alumno) {
            res.status(200).json({ message: 'Inicio de sesión exitoso, el patrón existe en el sistema', alumno: alumno });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }).catch(err => {
        console.error('Error al buscar el usuario:', err);
        res.status(500).json({ message: 'Error al buscar el usuario' });
    });
};

//GET
// http://localhost:3000/alumnos
exports.listarAlumnos = (req, res) => {
    Alumno.findAll().then(users => {
        res.status(200).json({
            status: 'success',
            message: 'Alumnos obtenidos correctamente',
            usuarios: users,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los alumnos',
            error: err
        });
    });
}

//GET
// http://localhost:3000/alumnos/:id_usuario
exports.obtenerAlumno = async (req, res) => {
    const { id_usuario } = req.params;

    Alumno.findOne({
        where: { id_usuario }
    }).then(student => {
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el alumno'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Alumno obtenido correctamente',
                alumno: student,
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el alumno',
            error: err
        });
    });

};

//POST
// http://localhost:3000/alumnos/create
exports.registrarAlumno = (req, res) => {
    const { nickname, patron, perfil,image } = req.body;
    const regex = /^([DSFI])([0-3])\1[0-3]\1[0-3]\1[0-3]$/;

    if (!nickname || !patron || !perfil) {
        return res.status(400).json({ 
            status: 'error',
            codigo_error: 1, //Codigo de error de falta de datos
            message: 'Nickname, contraseña y perfil son requeridos' 
        });
    }else if(!regex.test(patron)) {
        return res.status(400).json({
            status: 'error',
            codigo_error: 2, //Codigo de error de formato no valido
            message: 'El patrón no es válido'
        });
    }

    const texto = perfil.texto || false;
    const imagenes = perfil.imagenes || false;
    const pictograma = perfil.pictograma|| false;
    const video = perfil.video || false;

    if(!texto && !imagenes && !pictograma && !video){
        return res.status(400).json({ 
            status: 'error',
            codigo_error: 3, //Codigo de error de falta de perfil
            message: 'El alumno debe tener al menos un tipo de perfil' 
        });
    }

    Alumno.create({
        nickname: nickname,
        contrasenia: patron,
        texto: texto,
        imagenes: imagenes,
        pictograma: pictograma,
        video: video,
        imagenBase64 : image
    }).then(student => {
        res.status(201).json({
            status: 'success',
            message: 'Alumno creado correctamente',
            alumno: student,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            codigo_error: 4, //Codigo de error de fallo al crear por duplicidad
            message: 'Error al crear el alumno',
        });
    });
};

//PUT
// http://localhost:3000/alumnos/:id_usuario
exports.actualizarAlumno = (req, res) => {
    const { nickname, patron, perfil, image } = req.body;
    const { id_usuario } = req.params;

    const texto = perfil.texto || false;
    const imagenes = perfil.imagenes || false;
    const pictograma = perfil.pictograma|| false;
    const video = perfil.video || false;

    if(!texto && !imagenes && !pictograma && !video){
        return res.status(400).json({ 
            status: 'error',
            message: 'El alumno debe tener al menos un tipo de perfil' 
        });
    }

    Alumno.findOne({
        where: { id_usuario }
    }).then(student => {
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el alumno que se quiere actualizar'
            });
        }

        return student.update({
            nickname: nickname,
            contrasenia: patron,
            texto: texto,
            imagenes: imagenes,
            pictograma: pictograma,
            video: video,
            imagenBase64 : image
        });
    }).then(updatedStudent => {
        res.status(201).json({
            status: 'success',
            message: 'Alumno actualizado correctamente',
            alumno: updatedStudent
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el alumno',
            error: err
        });
    });
};

//DELETE
// http://localhost:3000/alumnos/:id_usuario
exports.eliminarAlumno = (req, res) => {
    const { id_usuario } = req.params;

    Alumno.destroy({
        where: { id_usuario }
    }).then(deletedRows => {
        if (!deletedRows) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el alumno que se quiere eliminar'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Alumno eliminado correctamente'
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el alumno',
            error: err
        });
    });
}