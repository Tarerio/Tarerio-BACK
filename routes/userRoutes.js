// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta de inicio de sesión
router.get('/inicioSesionAlumno', userController.inicioSesionAlumno); // http://localhost:3000/usuarios/inicioSesionAlumno?patron=SSBBS

module.exports = router;