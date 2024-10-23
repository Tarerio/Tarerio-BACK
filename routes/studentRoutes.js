// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

//Endpoints de la API de alumnos

//POST
// http://localhost:3000/alumnos/create
router.post('/crear', studentController.registrarAlumno);

//GET
// http://localhost:3000/alumnos
router.get('', studentController.listarAlumnos);

//GET
// http://localhost:3000/alumnos/:id_usuario
router.get('/:id_usuario', studentController.obtenerAlumno);

//PUT
// http://localhost:3000/alumnos/:id_usuario
router.put('/:id_usuario', studentController.actualizarAlumno);

//DELETE
// http://localhost:3000/alumnos/:id_usuario
router.delete('/:id_usuario', studentController.eliminarAlumno);

module.exports = router;