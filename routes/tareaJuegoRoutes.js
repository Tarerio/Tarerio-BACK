// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const tareaJuegoController = require('../controllers/tareaJuegoController');

// GET by id
// http://localhost:3000/tareaJuego/:id
router.get('/:id', tareaJuegoController.getTareaJuegoById);

// GET all
// http://localhost:3000/tareaJuego
router.get('', tareaJuegoController.getAllTareasJuego);

// POST create a GameTask
// http://localhost:3000/tareaJuego
router.post('', tareaJuegoController.crearTareaJuego);

// PUT update GameTask by id
// http://localhost:3000/tareaJuego/:id
router.put('/:id', tareaJuegoController.updateTareaJuego);

module.exports = router;