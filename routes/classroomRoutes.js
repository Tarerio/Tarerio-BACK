// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

//Endpoints de la API de aulas

//POST
// http://localhost:3000/aulas/create
router.post('/crear', classroomController.crearAula);

module.exports = router;