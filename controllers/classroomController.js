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