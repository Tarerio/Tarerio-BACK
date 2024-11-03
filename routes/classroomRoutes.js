// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

//Endpoints de la API de aulas

//POST
// http://localhost:3000/aulas/create
router.post('/create', classroomController.crearAula);

//GET
// http://localhost:3000/aulas/:id_aula
router.get('/:id_aula', classroomController.obtenerAula);

//GET
// http://localhost:3000/aulas
router.get("/", classroomController.obtenerAulas);

//PUT
// http://localhost:3000/aulas/:id_aula
router.put('/:id_aula', classroomController.actualizarAula);

//DELETE
// http://localhost:3000/aulas/:id_aula
router.delete('/:id_aula', classroomController.eliminarAula);

module.exports = router;