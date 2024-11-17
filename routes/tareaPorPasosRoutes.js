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
 *     summary: Asignar tarea a alumno
 *     tags: [TareasPorPasos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea de por pasos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID del alumno
 *               Fecha_fin_asignacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de asignación
 *               pasosPagina:
 *                 type: integer
 *                 description: Número de pasos de la página (opcional)
 *     responses:
 *       201:
 *         description: Tarea asignada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 asignacion:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     ID_tarea:
 *                       type: integer
 *                     Fecha_fin_asignacion:
 *                       type: string
 *                       format: date
 *                     completado:
 *                       type: boolean
 *                     revisado:
 *                       type: boolean
 *                     pasosPagina:
 *                       type: integer
 *       404:
 *         description: Alumno o tarea no encontrada
 *       500:
 *         description: Error al asignar tarea a alumno
 */
router.post("/:id/asignar", tareaPorPasosController.asignarTareaAlumno);


/**
 * @swagger
 * /tareaPorPasos/{nickname}/asignadas:
 *   get:
 *     summary: Obtener tareas asignadas a un usuario
 *     tags: [TareasPorPasos]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *         description: Nickname del usuario
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [en_proceso, completado, revisado]
 *         required: false
 *         description: Estado de las tareas (en_proceso, completado, revisado)
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de las tareas en formato YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Lista de tareas asignadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                   id_tarea:
 *                     type: integer
 *                   completado:
 *                     type: boolean
 *                   revisado:
 *                     type: boolean
 *                   Fecha_fin_asignacion:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al obtener las tareas asignadas
 */
router.get("/:nickname/asignadas", tareaPorPasosController.getTareasAsignadasByAlumno);

  // PUT marcarTarea/marcar tarea como completada o revisada por ID de la tarea
/**
 * @swagger
 * /tareaPorPasos/marcarTarea/marcar:
 *   put:
 *     summary: Marcar tarea por pasos como completada o revisada
 *     tags: [TareasPorPasos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: Nickname del alumno
 *               ID_tarea:
 *                 type: integer
 *                 description: ID de la tarea por pasos asignada
 *               completado:
 *                 type: boolean
 *                 description: Estado de completado de la tarea
 *               revisado:
 *                 type: boolean
 *                 description: Estado de revisado de la tarea
 *     responses:
 *       200:
 *         description: Tarea por pasos marcada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 tarea:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     id_tarea:
 *                       type: integer
 *                     completado:
 *                       type: boolean
 *                     revisado:
 *                       type: boolean
 *                     Fecha_fin_asignacion:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Alumno o tarea no encontrada
 *       500:
 *         description: Error al marcar la tarea de por pasos
 */
router.put("/marcarTarea/marcar", tareaPorPasosController.marcarTareaPorPasos);

// DELETE eliminar tarea por pasos por ID
/**
 * @swagger
 * /tareaPorPasos/{id}:
 *   delete:
 *     summary: Eliminar una tarea por pasos por su ID
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
 *         description: Tarea por pasos eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al eliminar la tarea por pasos
 */
router.delete("/:id", tareaPorPasosController.eliminarTareaPorPasos);

module.exports = router;