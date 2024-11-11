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



// PATCH actualizar solo la fecha estimada de cierre de una tarea
/**
 * @swagger
 * /tareaJuego/{id}:
 *   patch:
 *     summary: Actualizar la fecha estimada de cierre de una tarea
 *     tags: 
 *       - TareasJuego
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea que se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Fecha_estimada_cierre:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-12-31T23:59:59Z"
 *                 description: Nueva fecha estimada de cierre de la tarea en formato ISO 8601.
 *     responses:
 *       '200':
 *         description: Fecha estimada de cierre actualizada con éxito.
 *       '404':
 *         description: Tarea no encontrada.
 *       '500':
 *         description: Error interno al actualizar la fecha estimada de cierre.
 */
router.patch("/:id", tareaJuegoController.updateFechaCierreTarea);


// POST asignar tarea juego a un usuario
/**
 * @swagger
 * /tareaJuego/{id}/asignar:
 *   post:
 *     summary: Asignar una tarea juego a un usuario
 *     tags: [TareasJuego]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea juego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tarea juego asignada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al asignar la tarea juego
 */
router.post("/:id/asignar", tareaJuegoController.asignarTareaAlumno);

module.exports = router;