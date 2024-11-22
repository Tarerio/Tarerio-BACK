const express = require("express");
const router = express.Router();
const tareaPeticionController = require("../controllers/tareaPeticionController");

// GET
// http://localhost:3000/tareaPeticion/filtered?nombreTarea=...
/**
 * @swagger
 * /tareaPeticion/filtered:
 *   get:
 *     summary: Filtra tareas de juego por nombre
 *     description: Este endpoint permite obtener todas las tareas de juego que coinciden parcialmente con el nombre proporcionado.
 *     tags: [TareasPeticion]
 *     parameters:
 *       - in: query
 *         name: nombreTarea
 *         description: El nombre de la tarea para filtrar las tareas de juego (opcional)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas de juego filtradas por nombre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/tareaPeticion"
 *       400:
 *         description: Solicitud inválida, nombreTarea no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/filtered', tareaPeticionController.filteredGetAllTareaPeticion);

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
 *               image:
 *                 type: string
 *                 description: Imagen en base64
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
 *               image:
 *                 type: string
 *                 description: Imagen en base64
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
 *     summary: Asignar tarea a alumno
 *     tags: [TareasPeticion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
router.post("/:id/asignar", tareaPeticionController.asignarTareaAlumno);

/**
 * @swagger
 * /tareaPeticion/{nickname}/asignadas:
 *   get:
 *     summary: Obtener tareas asignadas a un usuario
 *     tags: [TareasPeticion]
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
router.get("/:nickname/asignadas", tareaPeticionController.getTareasAsignadasByAlumno);

// PUT marcarTarea/marcar tarea como completada o revisada por ID de la tarea
/**
 * @swagger
 * /tareaPeticion/marcarTarea/marcar:
 *   put:
 *     summary: Marcar tarea de petición como completada o revisada
 *     tags: [TareasPeticion]
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
 *                 description: ID de la tarea de peticion asignada
 *               completado:
 *                 type: boolean
 *                 description: Estado de completado de la tarea
 *               revisado:
 *                 type: boolean
 *                 description: Estado de revisado de la tarea
 *     responses:
 *       200:
 *         description: Tarea de peticion marcada exitosamente
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
router.put("/marcarTarea/marcar", tareaPeticionController.marcarTareaPeticion);
// DELETE eliminar tarea de petición por ID
/**
 * @swagger
 * /tareaPeticion/{id}:
 *   delete:
 *     summary: Eliminar una tarea de petición por su ID
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
 *         description: Tarea de petición eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al eliminar la tarea de petición
 */
router.delete("/:id", tareaPeticionController.eliminarTareaPeticion);

module.exports = router;