// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

//Endpoints de la API de profesores

//POST
// http://localhost:3000/profesores/create
router.post('/crear', teacherController.registrarProfesor);

//GET
// http://localhost:3000/profesores
router.get('', teacherController.listarProfesores);

//GET
// http://localhost:3000/profesores/:id_usuario
router.get('/:id_usuario', teacherController.obtenerProfesor);

//PUT
// http://localhost:3000/profesores/:id_usuario
router.put('/:id_usuario', teacherController.actualizarProfesor);

//DELETE
// http://localhost:3000/profesores/:id_usuario
router.delete('/:id_usuario', teacherController.eliminarProfesor);

module.exports = router;