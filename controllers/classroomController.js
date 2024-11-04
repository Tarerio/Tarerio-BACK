const bcrypt = require('bcrypt');
const Aula = require('../models/classroom');
const Profesor = require('../models/teacher');
const AulaProfesor = require('../models/relations/AulaProfesor');

//POST
// http://localhost:3000/aulas/create
exports.crearAula = async (req, res) => {
    const { clave, capacidad } = req.body;

    if (!clave || !capacidad) {
        return res.status(400).json({
            status: 'error',
            message: 'Clave y cupo requeridos'
        });
    } else if (clave.length < 0) {
        return res.status(400).json({
            status: 'error',
            message: 'La clave del aula debe de tener al menos un caracter'
        });
    } else if (capacidad <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'El cupo debe de ser un numero positivo'
        });
    }

    Aula.create({
        clave_aula: clave,
        cupo: capacidad,
    }).then(classroom => {
        res.status(201).json({
            status: 'success',
            message: 'Aula creada correctamente',
            aula: classroom,
        });
        return;
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el aula',
            error: err
        });
        return;
    });
};

//GET
// http://localhost:3000/aulas/:id_aula
exports.obtenerAula = async (req, res) => {
    const { id_aula } = req.params;

    Aula.findOne({
        where: { id_aula }
    }).then(classroom => {
        if (!classroom) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el aula'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Aula obtenida correctamente',
                aula: classroom,
            });
        }
    }).catch(err => {
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener el aula',
            error: err
        });
    });

};

// GET
// http://localhost:3000/aulas
exports.obtenerAulas = async (req, res) => {
    Aula.findAll() // Recupera todos los atributos de cada aula
        .then(aulas => {
            res.status(200).json({
                status: 'success',
                message: 'Aulas obtenidas correctamente',
                aulas: aulas
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                message: 'Error al obtener las aulas',
                error: err
            });
        });
};

//PUT
// http://localhost:3000/aulas/:id_aula
exports.actualizarAula = async (req, res) => {
    const { clave, capacidad } = req.body;
    const { id_aula } = req.params;

    if (clave.length < 0) {
        return res.status(400).json({
            status: 'error',
            message: 'La clave del aula debe de tener al menos un caracter'
        });
    } else if (capacidad <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'El cupo debe de ser un numero positivo'
        });
    }

    Aula.findOne({
        where: { id_aula }
    }).then(async classroom => {
        if (!classroom) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el aula que se quiere actualizar'
            });
        }

        return classroom.update({
            clave_aula: clave,
            cupo: capacidad,
        });
    }).then(updatedClassroom => {
        res.status(201).json({
            status: 'success',
            message: 'Aula actualizada correctamente',
            aula: updatedClassroom
        });
        return;
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el aula',
            error: err
        });
        return;
    });
};

//DELETE
// http://localhost:3000/aulas/:id_aula
exports.eliminarAula = (req, res) => {
    const { id_aula } = req.params;

    Aula.destroy({
        where: { id_aula }
    }).then(deletedRows => {
        if (!deletedRows) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el aula que se quiere eliminar'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Aula eliminada correctamente'
        });
        return;
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el aula',
            error: err
        });
        return;
    });
}

//POST
// http://localhost:3000/aulas/asignar-profesor
exports.asignarProfesor = (req, res) => {
    const { id_aula, id_usuario } = req.body;

    Aula.findByPk(id_aula)
        .then(aula => {
            if (!aula) {
                return res.status(404).json({ message: 'Aula no encontrada' });
            }

            return Profesor.findByPk(id_usuario)
                .then(profesor => {
                    if (!profesor) {
                        return res.status(404).json({ message: 'Profesor no encontrado' });
                    }
                    return AulaProfesor.create({ id_aula, id_usuario });
                })
                .then(() => {
                    res.status(200).json({ message: 'Profesor asignado al aula exitosamente' });
                });
        })
        .catch(error => {
            console.error('Error al asignar profesor:', error);
            res.status(500).json({ message: 'Error al asignar profesor', error });
        });
};