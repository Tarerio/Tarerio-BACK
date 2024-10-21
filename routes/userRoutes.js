// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta de inicio de sesión
router.get('/inicioSesion', userController.inicioSesion); // http://localhost:3000/inicioSesion/inicioSesion?nickname=test&contrasenia=test

module.exports = router;