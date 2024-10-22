// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

//Endpoints de la API de alumnos
router.post('/registrarAlumno', studentController.registrarAlumno); // http://localhost:3000/alumnos/registrarAlumno
router.get('/', studentController.listarAlumnos); // http://localhost:3000/alumnos/listarAlumnos
router.get('/alumno/:id_usuario', studentController.obtenerAlumno); // http://localhost:3000/alumnos/alumno/1
router.put('/actualizarAlumno/:id_usuario', studentController.actualizarAlumno); // http://localhost:3000/alumnos/actualizarAlumno/1

module.exports = router;