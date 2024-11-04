const express = require('express');
const router = express.Router();
const { agregarProfesor, eliminarProfesor } = require('../controllers/profesorController');
const { asignarProfesorAula, eliminarAsignacionProfesorAula } = require('../controllers/profesor-aulaController');

//Ruta para crear un nuevo profesor
router.post('/crear', agregarProfesor);

//Ruta para eliminar un profesor
router.delete('/eliminar/:id_usuario', eliminarProfesor);

//Ruta para asignar un profesor a un aula
router.post('/asignar-profesor-aula', asignarProfesorAula);

//Ruta para eliminar la asignación de un profesor a un aula
router.delete('/eliminar-asignacion-profesor-aula', eliminarAsignacionProfesorAula);

module.exports = router;