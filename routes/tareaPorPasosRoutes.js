// routes/tareaPorPasosRouter.js
const express = require("express");
const router = express.Router();
const tareaPorPasosController = require("../controllers/tareaPorPasosController");

// GET by id
// http://localhost:3000/tareaPorPasos/:id
router.get("/:id", tareaPorPasosController.getTareaPorPasosById);

// GET all
// http://localhost:3000/tareaPorPasos
router.get("", tareaPorPasosController.getAllTareaPorPasos);

// POST create a StepsTask
// http://localhost:3000/tareaPorPasos
router.post("", tareaPorPasosController.crearTareaPorPasos);

// PUT update StepsTask by id
// http://localhost:3000/tareaPorPasos/:id
router.put("/:id", tareaPorPasosController.updateTareaPorPasos);

module.exports = router;