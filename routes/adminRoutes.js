// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

//Endpoints de la API de alumnos

//POST
// http://localhost:3000/administradores/inicioSesionAdministrador
router.post('/inicioSesionAdministrador', adminController.inicioSesionAdmin); 

//POST
// http://localhost:3000/administradores/crear
router.post('/crear', adminController.registrarAdmin);



module.exports = router;