const Alumno = require('../models/student');

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
    const { nickname, patron } = req.body;
    const validChars = ['D', 'S', 'F', 'I'];//Dinosaurio, Superheroe, Figura, Insecto
    const charIndices = [0, 2, 4, 6];
    const numIndices = [1, 3, 5, 7];
    
    //Comprobar que los caracteres son igual a D,F,I,S y que los numeros estan entre 0 y 3
    const areValidChar = charIndices.every(index => validChars.includes(patron.charAt(index)));
    const areValidNums = numIndices.every(index => {
        const char = patron.charAt(index);
        const num = parseInt(char, 10);
        return !isNaN(num) && num >= 0 && num <= 3;
    });

    if (!nickname || !patron) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Nickname y contraseña son requeridos' 
        });
    }else if(patron.length !== 8 || !areValidChar || !areValidNums){
        return res.status(400).json({ 
            status: 'error',
            message: 'El patron de la contraseña no es valido' 
        });
    }

    Alumno.create({
        nickname: nickname,
        contrasenia: patron
    }).then(student => {
        res.status(201).json({
            status: 'success',
            message: 'Alumno creado correctamente',
            alumno: student,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el alumno',
            error: err
        });
    });
};

//PUT
// http://localhost:3000/alumnos/:id_usuario
exports.actualizarAlumno = (req, res) => {
    const { nickname, patron } = req.body;
    const { id_usuario } = req.params;

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
            contrasenia: patron
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