const express = require('express');
const router = express.Router();
const { agregarProfesor, eliminarProfesor } = require('../controllers/profesorController');

//Ruta para crear un nuevo profesor
router.post('/crear'. agregarProfesor);

//Ruta para eliminar un profesor
router.delete('/eliminar/:id_usuario', eliminarProfesor);

module.exports = router;