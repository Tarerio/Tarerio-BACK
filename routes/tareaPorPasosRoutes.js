// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const tareaPorPasosController = require("../controllers/tareaPorPasos");

// GET by id
// http://localhost:3000/tareaPorPasos/:id
router.get("/tareaPorPasos/:id", tareaPorPasosController.getTareaPorPasosById);

// GET all
// http://localhost:3000/tareaPorPasos
router.get("/tareaPorPasos", tareaPorPasosController.getAllTareaPorPasos);

// POST create a StepsTask
// http://localhost:3000/tareaPorPasos
router.post("/tareaPorPasos", tareaPorPasosController.crearTareaPorPasos);

// PUT update StepsTask by id
// http://localhost:3000/tareaPorPasos/:id
router.put("/tareaPorPasos/:id", tareaPorPasosController.updateTareaPorPasos);

module.exports = router;