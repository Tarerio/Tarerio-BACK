const Student = require('../models/student');

const listarAlumnos = (req, res) => {
    Student.findAll().then(users => {
        console.log('Alumnos:', users);
        res.status(200).json(users);
    }).catch(err => {
        console.error('Error al listar los alumnos:', err);
    });
}

const obtenerAlumno = async (req, res) => {
    const { id_usuario } = req.params;

    Student.findOne({
        where: { id_usuario }
    }).then(user => {
        console.log('Alumno:', user);
        res.status(200).json(user);
    }).catch(err => {
        console.error('Error al obtener el alumno:', err);
    });

};

const registrarAlumno = (req, res) => {
    const { nickname, patron } = req.body;

    if (!nickname || !patron) {
        return res.status(400).json({ message: 'Nickname y contraseña son requeridos' });
    }

    Student.create({
        nickname: nickname,
        contrasenia: patron
    }).then(user => {
        console.log('Alumno creado:', user);
        res.status(201).json(user);
    }).catch(err => {
        console.error('Error al crear el alumno:', err);
    });
};

const actualizarAlumno = (req, res) => {
    const { nickname, patron } = req.body;
    const { id_usuario } = req.params;

    Student.findOne({ 
        where: { id_usuario } 
    }).then(student => {
        if (!student) {
            return res.status(404).json({ message: 'No se ha encontrado el alumno que se quiere actualizar' });
        }

        return student.update({
            nickname: nickname,
            contrasenia: patron
        });
    })
    .then(updatedStudent => {
        console.log('Alumno actualizado:', updatedStudent);
        res.status(201).json(updatedStudent);
    })
    .catch(err => {
        console.error('Error al actualizar el alumno:', err);
        res.status(500).json({ message: 'Error al actualizar el alumno' });
    });
};

module.exports = {
    listarAlumnos,
    actualizarAlumno,
    obtenerAlumno,
    registrarAlumno
};