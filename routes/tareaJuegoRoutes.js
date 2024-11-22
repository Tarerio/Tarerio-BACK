const express = require('express');
const router = express.Router();
const tareaJuegoController = require('../controllers/tareaJuegoController');

// GET
// http://localhost:3000/tareaJuego/filtered?nombreTarea=...
/**
 * @swagger
 * /tareaJuego/filtered:
 *   get:
 *     summary: Filtra tareas de juego por nombre
 *     description: Este endpoint permite obtener todas las tareas de juego que coinciden parcialmente con el nombre proporcionado.
 *     tags: [TareasJuego]
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
 *                 $ref: "#/components/schemas/TareaJuego"
 *       400:
 *         description: Solicitud inválida, nombreTarea no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/filtered', tareaJuegoController.filteredGetAllTareaPeticion);


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
 *               image:
 *                 type: string
 *                 description: Imagen en base64
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
 *               image:
 *                 type: string
 *                 description: Imagen en base64
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
 *               Fecha_fin_asignacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarea juego asignada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al asignar la tarea juego
 */
router.post("/:id/asignar", tareaJuegoController.asignarTareaAlumno);

// GET obtener tareas asignadas a un usuario, por nickname, y filtradas por "en proceso" ( completado = false), "completadas" (completado = true) o "revisadas" (revisado = true)
/**
 * @swagger
 * /tareaJuego/{nickname}/asignadas:
 *   get:
 *     summary: Obtener tareas asignadas a un usuario
 *     tags: [TareasJuego]
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
router.get("/:nickname/asignadas", tareaJuegoController.getTareasAsignadasByAlumno);

// PUT marcarTarea/marcar tarea como completada o revisada por ID de la tarea
/**
 * @swagger
 * /tareaJuego/marcarTarea/marcar:
 *   put:
 *     summary: Marcar tarea de juego como completada o revisada
 *     tags: [TareasJuego]
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
 *                 description: ID de la tarea de juego asignada
 *               completado:
 *                 type: boolean
 *                 description: Estado de completado de la tarea
 *               revisado:
 *                 type: boolean
 *                 description: Estado de revisado de la tarea
 *     responses:
 *       200:
 *         description: Tarea de juego marcada exitosamente
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
 *         description: Error al marcar la tarea de juego
 */
router.put("/marcarTarea/marcar", tareaJuegoController.marcarTareaJuego);

// DELETE eliminar tarea de juego por ID
/**
 * @swagger
 * /tareaJuego/{id}:
 *   delete:
 *     summary: Eliminar una tarea de juego por su ID
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
 *         description: Tarea de juego eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al eliminar la tarea de juego
 */
router.delete('/:id', tareaJuegoController.eliminarTareaJuego);

module.exports = router;