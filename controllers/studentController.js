const Student = require('../models/student');

const listarAlumnos = (req, res) => {
    Student.findAll().then(users => {
        console.log('Alumnos:', users);
        res.status(200).json(users);
    }).catch(err => {
        console.error('Error al listar los alumnos:', err);
    });
}

const obtenerAlumno = (req, res) => {
    const { nickname } = req.query;

    Student.findOne({
        where: {
            nickname: nickname
        }
    }).then(user => {
        console.log('Alumno encontrado:', user);
        res.status(200).json(user);
    }).catch(err => {
        console.error('Error al buscar el alumno:', err);
    });
}

const registrarAlumno = (req, res) => {
    const { nickname,patron } = req.query;

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

const actualizarAlumno = async (req, res) => {
    const { nickname, patron,id_usuario } = req.query;

    try {
        // Buscar al estudiante por su nickname
        const student = await Student.findOne({ where: { id_usuario } });

        if (!student) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        // Actualizar los datos del estudiante
        await student.update({
            nickname: nickname,
            contrasenia: patron
        });

        console.log('Alumno actualizado:', student);
        res.status(201).json(student);
    } catch (err) {
        console.error('Error al actualizar el alumno:', err);
        res.status(500).json({ message: 'Error al actualizar el alumno' });
    }
};

module.exports = {
    listarAlumnos,
    actualizarAlumno,
    obtenerAlumno,
    registrarAlumno
};