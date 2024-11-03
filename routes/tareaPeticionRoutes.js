// routes/tareaPeticionRouter.js
const express = require("express");
const router = express.Router();
const tareaPeticionController = require("../controllers/tareaPeticionController");

// GET by id
//http://localhost:3000/tareaPeticion/:id
router.get("/:id", tareaPeticionController.getTareaPeticionById);

// GET all
// http://localhost:3000/tareaPeticion
router.get("", tareaPeticionController.getAllTareaPeticion);

// POST create a PetitionTask
// http://localhost:3000/tareaPeticion
router.post("", tareaPeticionController.crearTareaPeticion);

// PUT update PetitionTask by id
// http://localhost:3000/tareaPeticion/:id
router.put("/:id", tareaPeticionController.updateTareaPeticion);

module.exports = router;