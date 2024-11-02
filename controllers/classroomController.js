const Aula = require('../models/classroom');
const bcrypt = require('bcrypt');

//POST
// http://localhost:3000/aulas/create
exports.crearAula = async (req, res) => {
    const { clave, capacidad} = req.body;

    if (!clave || !capacidad) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Clave y cupo requeridos' 
        });
    }else if(clave.length < 0){
        return res.status(400).json({ 
            status: 'error',
            message: 'La clave del aula debe de tener al menos un caracter'
        });
    }else if(capacidad <= 0){
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
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el aula',
            error: err
        });
    });
};

//GET
// http://localhost:3000/aula/:id_aula
exports.obtenerAula = async (req, res) => {
    const { id_aula } = req.params;

    Aula.findOne({
        where: { id_aula }
    }).then(student => {
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el aula'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Aula obtenida correctamente',
                alumno: student,
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el aula',
            error: err
        });
    });

};

//PUT
// http://localhost:3000/aulas/:id_aula
exports.actualizarAula = async (req, res) => {
    const { clave, capacidad} = req.body;
    const { id_aula } = req.params;

    if(clave.length < 0){
        return res.status(400).json({ 
            status: 'error',
            message: 'La clave del aula debe de tener al menos un caracter'
        });
    }else if(capacidad <= 0){
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
            profesor: updatedClassroom
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el aula',
            error: err
        });
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
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el aula',
            error: err
        });
    });
}