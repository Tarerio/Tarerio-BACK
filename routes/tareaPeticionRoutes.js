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
 *                     Texto:
 *                       type: string
 *                     Respuestas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           Respuesta:
 *                             type: string
 *                           Realizada:
 *                             type: boolean
 *               creatorId:
 *                 type: integer
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
 *                           Realizada:
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

// PATCH actualizar solo la fecha estimada de cierre de una tarea
/**
 * @swagger
 * /tareaPeticion/{id}:
 *   patch:
 *     summary: Actualizar la fecha estimada de cierre de una tarea
 *     tags: 
 *       - TareasPeticion
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
router.patch("/:id", tareaPeticionController.updateFechaCierreTarea);

// POST asignar tarea de petición a un usuario
/**
 * @swagger
 * /tareaPeticion/{id}/asignar:
 *   post:
 *     summary: Asignar una tarea de petición a un usuario
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
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tarea de petición asignada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al asignar la tarea de petición
 */
router.post("/:id/asignar", tareaPeticionController.asignarTareaAlumno);


module.exports = router;
