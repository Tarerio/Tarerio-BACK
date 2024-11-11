const express = require("express");
const router = express.Router();
const tareaPeticionController = require("../controllers/tareaPeticionController");

// GET obtener tarea de petición por ID
/**
 * @swagger
 * /tareaPeticion/{id}:
 *   get:
 *     summary: Obtener una tarea de petición por su ID
 *     tags: [TareasPeticion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea de petición
 *     responses:
 *       200:
 *         description: Tarea de petición obtenida exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al obtener la tarea de petición
 */
router.get("/:id", tareaPeticionController.getTareaPeticionById);

// GET obtener todas las tareas de petición
/**
 * @swagger
 * /tareaPeticion:
 *   get:
 *     summary: Obtener todas las tareas de petición
 *     tags: [TareasPeticion]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas de petición
 *       500:
 *         description: Error al obtener las tareas de petición
 */
router.get("", tareaPeticionController.getAllTareaPeticion);

// POST crear una nueva tarea de petición
/**
 * @swagger
 * /tareaPeticion:
 *   post:
 *     summary: Crear una nueva tarea de petición
 *     tags: [TareasPeticion]
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
 *               enunciados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Enunciado:
 *                       type: string
 *                     Respuestas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           Respuesta:
 *                             type: string
 *                           Correcta:
 *                             type: boolean
 *     responses:
 *       201:
 *         description: Tarea de petición creada exitosamente
 *       500:
 *         description: Error al crear la tarea de petición
 */
router.post("", tareaPeticionController.crearTareaPeticion);

// PUT actualizar tarea de petición por ID
/**
 * @swagger
 * /tareaPeticion/{id}:
 *   put:
 *     summary: Actualizar una tarea de petición por su ID
 *     tags: [TareasPeticion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea de petición
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
 *               enunciados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Enunciado:
 *                       type: string
 *                     Respuestas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           Respuesta:
 *                             type: string
 *                           Correcta:
 *                             type: boolean
 *     responses:
 *       200:
 *         description: Tarea de petición actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al actualizar la tarea de petición
 */
router.put("/:id", tareaPeticionController.updateTareaPeticion);

module.exports = router;
