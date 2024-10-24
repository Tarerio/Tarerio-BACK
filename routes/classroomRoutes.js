// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/classroomController');

//Endpoints de la API de profesores

//POST
// http://localhost:3000/aulas/create
router.post('/crear', classroomController.crearAula);

module.exports = router;