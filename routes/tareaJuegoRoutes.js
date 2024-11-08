const express = require('express');
const router = express.Router();
const tareaJuegoController = require('../controllers/tareaJuegoController');

// GET obtener tarea por ID
/**
 * @swagger
 * /tareaJuego/{id}:
 *   get:
 *     summary: Obtener una tarea de juego por su ID
 *     tags: [TareasJuego]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea de juego
 *     responses:
 *       200:
 *         description: Tarea de juego obtenida exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al obtener la tarea
 */
router.get('/:id', tareaJuegoController.getTareaJuegoById);

// GET obtener todas las tareas
/**
 * @swagger
 * /tareaJuego:
 *   get:
 *     summary: Obtener todas las tareas de juego
 *     tags: [TareasJuego]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas de juego
 *       500:
 *         description: Error al obtener las tareas
 */
router.get('', tareaJuegoController.getAllTareasJuego);

// POST crear una tarea de juego
/**
 * @swagger
 * /tareaJuego:
 *   post:
 *     summary: Crear una nueva tarea de juego
 *     tags: [TareasJuego]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Titulo:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Fecha_estimada_cierre:
 *                 type: string
 *                 format: date
 *               Enlace:
 *                 type: string
 *                 description: URL del recurso asociado a la tarea
 *               creatorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarea de juego creada exitosamente
 *       500:
 *         description: Error al crear la tarea de juego
 */
router.post('', tareaJuegoController.crearTareaJuego);

// PUT actualizar tarea de juego por ID
/**
 * @swagger
 * /tareaJuego/{id}:
 *   put:
 *     summary: Actualizar una tarea de juego por su ID
 *     tags: [TareasJuego]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea de juego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Titulo:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Fecha_estimada_cierre:
 *                 type: string
 *                 format: date
 *               Enlace:
 *                 type: string
 *                 description: URL del recurso asociado a la tarea
 *     responses:
 *       200:
 *         description: Tarea de juego actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al actualizar la tarea de juego
 */
router.put('/:id', tareaJuegoController.updateTareaJuego);

module.exports = router;
