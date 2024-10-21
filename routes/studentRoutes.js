// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Ruta de inicio de sesión
router.post('/registrarAlumno', studentController.registrarAlumno); // http://localhost:3000/alumnos/registrarAlumno?nickname=Pepe?patron=SSBBS
router.get('/alumnos', studentController.listarAlumnos); // http://localhost:3000/alumnos/listarAlumnos

module.exports = router;