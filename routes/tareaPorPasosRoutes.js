const express = require("express");
const router = express.Router();
const tareaPorPasosController = require("../controllers/tareaPorPasosController");

// GET obtener tarea por pasos por ID
/**
 * @swagger
 * /tareaPorPasos/{id}:
 *   get:
 *     summary: Obtener una tarea por pasos por su ID
 *     tags: [TareasPorPasos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea por pasos
 *     responses:
 *       200:
 *         description: Tarea por pasos obtenida exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al obtener la tarea por pasos
 */
router.get("/:id", tareaPorPasosController.getTareaPorPasosById);

// GET obtener todas las tareas por pasos
/**
 * @swagger
 * /tareaPorPasos:
 *   get:
 *     summary: Obtener todas las tareas por pasos
 *     tags: [TareasPorPasos]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas por pasos
 *       500:
 *         description: Error al obtener las tareas por pasos
 */
router.get("", tareaPorPasosController.getAllTareaPorPasos);

// POST crear una nueva tarea por pasos
/**
 * @swagger
 * /tareaPorPasos:
 *   post:
 *     summary: Crear una nueva tarea por pasos
 *     tags: [TareasPorPasos]
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
 *               subtareas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Texto:
 *                       type: string
 *                     Imagen:
 *                       type: string
 *                     Pictograma:
 *                       type: string
 *                     Video:
 *                       type: string
 *               creatorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarea por pasos creada exitosamente
 *       500:
 *         description: Error al crear la tarea por pasos
 */
router.post("", tareaPorPasosController.crearTareaPorPasos);

// PUT actualizar una tarea por pasos por ID
/**
 * @swagger
 * /tareaPorPasos/{id}:
 *   put:
 *     summary: Actualizar una tarea por pasos por su ID
 *     tags: [TareasPorPasos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea por pasos
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
 *               subtareas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ID_subtarea:
 *                       type: integer
 *                     Texto:
 *                       type: string
 *                     Imagen:
 *                       type: string
 *                     Pictograma:
 *                       type: string
 *                     Video:
 *                       type: string
 *     responses:
 *       200:
 *         description: Tarea por pasos actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al actualizar la tarea por pasos
 */
router.put("/:id", tareaPorPasosController.updateTareaPorPasos);


// PATCH actualizar solo la fecha estimada de cierre de una tarea
/**
 * @swagger
 * /tareaPorPasos/{id}:
 *   patch:
 *     summary: Actualizar la fecha estimada de cierre de una tarea
 *     tags: 
 *       - TareasPorPasos
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
router.patch("/:id", tareaPorPasosController.updateFechaCierreTarea);


// POST asignar tarea por pasos a un usuario
/**
 * @swagger
 * /tareaPorPasos/{id}/asignar:
 *   post:
 *     summary: Asignar una tarea por pasos a un usuario
 *     tags: [TareasPorPasos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea por pasos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               Fecha_fin_asignacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarea por pasos asignada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al asignar la tarea por pasos
 */
router.post("/:id/asignar", tareaPorPasosController.asignarTareaAlumno);

module.exports = router;