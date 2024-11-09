const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

// Endpoints de la API de aulas

/**
 * @swagger
 * /aulas/create:
 *   post:
 *     summary: Crear un nuevo aula
 *     description: Permite crear un aula especificando la clave, capacidad y una imagen opcional
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clave:
 *                 type: string
 *                 description: Clave única del aula
 *               capacidad:
 *                 type: integer
 *                 description: Capacidad máxima del aula
 *               image:
 *                 type: string
 *                 description: Imagen del aula en formato base64
 *     responses:
 *       201:
 *         description: Aula creada correctamente
 *       400:
 *         description: Clave o capacidad faltantes o inválidos
 *       500:
 *         description: Error al crear el aula
 */
router.post('/create', classroomController.crearAula);

/**
 * @swagger
 * /aulas/{id_aula}:
 *   get:
 *     summary: Obtener una aula específica
 *     description: Devuelve los detalles de un aula dada su ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id_aula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del aula
 *     responses:
 *       200:
 *         description: Aula obtenida correctamente
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error al obtener el aula
 */
router.get('/:id_aula', classroomController.obtenerAula);

/**
 * @swagger
 * /aulas:
 *   get:
 *     summary: Obtener todas las aulas
 *     description: Devuelve una lista de todas las aulas
 *     tags: [Aulas]
 *     responses:
 *       200:
 *         description: Aulas obtenidas correctamente
 *       500:
 *         description: Error al obtener las aulas
 */
router.get("/", classroomController.obtenerAulas);

/**
 * @swagger
 * /aulas/{id_aula}:
 *   put:
 *     summary: Actualizar una aula
 *     description: Permite actualizar la clave, capacidad y/o imagen de un aula existente
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id_aula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del aula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clave:
 *                 type: string
 *                 description: Nueva clave del aula
 *               capacidad:
 *                 type: integer
 *                 description: Nueva capacidad del aula
 *               image:
 *                 type: string
 *                 description: Nueva imagen del aula en base64
 *     responses:
 *       201:
 *         description: Aula actualizada correctamente
 *       400:
 *         description: Clave o capacidad inválidos
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error al actualizar el aula
 */
router.put('/:id_aula', classroomController.actualizarAula);

/**
 * @swagger
 * /aulas/{id_aula}:
 *   delete:
 *     summary: Eliminar una aula
 *     description: Elimina un aula específica dada su ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id_aula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del aula a eliminar
 *     responses:
 *       200:
 *         description: Aula eliminada correctamente
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error al eliminar el aula
 */
router.delete('/:id_aula', classroomController.eliminarAula);

/**
 * @swagger
 * /aulas/asignar-profesor:
 *   post:
 *     summary: Asignar un profesor a una aula
 *     description: Asigna un profesor a un aula específica
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_aula:
 *                 type: integer
 *                 description: ID del aula
 *               id_usuario:
 *                 type: integer
 *                 description: ID del profesor
 *     responses:
 *       200:
 *         description: Profesor asignado al aula exitosamente
 *       404:
 *         description: Aula o profesor no encontrado
 *       500:
 *         description: Error al asignar profesor al aula
 */
router.post('/asignar-profesor', classroomController.asignarProfesor);

/**
 * @swagger
 * /aulas/asignar-alumno:
 *   post:
 *     summary: Asignar un alumno a una aula
 *     description: Asigna un alumno a un aula específica
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_aula:
 *                 type: integer
 *                 description: ID del aula
 *               id_usuario:
 *                 type: integer
 *                 description: ID del alumno
 *     responses:
 *       200:
 *         description: Alumno asignado al aula exitosamente
 *       404:
 *         description: Aula o alumno no encontrado
 *       500:
 *         description: Error al asignar alumno al aula
 */
router.post('/asignar-alumno', classroomController.asignarAlumno);

/**
 * @swagger
 * /aulas/desasignar-alumno:
 *   post:
 *     summary: Desasignar un alumno de un aula
 *     description: Desasigna un alumno de un aula específica
=======
 * /aulas/{id_aula}/profesores:
 *   get:
 *     summary: Obtiene los profesores asignados a un aula específica
 *     description: Devuelve una lista de profesores asignados a un aula según el ID proporcionado.
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id_aula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del aula para la cual se quieren obtener los profesores asignados.
 *     responses:
 *       200:
 *         description: Lista de profesores asignados al aula especificada.
 *       404:
 *         description: No se han encontrado profesores asignados a este aula.
 *       500:
 *         description: Error al recuperar los profesores asignados a las aulas.
 */
router.get('/:id_aula/profesores', classroomController.profesoresAsignados);

/**
 * @swagger
 * /aulas/eliminar-profesor:
 *   post:
 *     summary: Eliminar la asignación de un profesor a un aula
 *     description: Elimina la fila que representa la asignación de un profesor específico a un aula en la base de datos.
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_profesor:
 *                 type: integer
 *                 description: ID del profesor a desasignar del aula.
 *                 example: 1
 *               id_aula:
 *                 type: integer
 *                 description: ID del aula de la que se eliminará al profesor.
 *                 example: 15
 *     responses:
 *       200:
 *         description: Profesor desasignado correctamente del aula
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Profesor desasignado correctamente del aula
 *       404:
 *         description: No se encontró una asignación del profesor en el aula especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No se encontró una asignación del profesor en el aula especificada
 *       500:
 *         description: Error al intentar desasignar el profesor del aula
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error al intentar desasignar el profesor del aula
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.post('/eliminar-profesor', classroomController.eliminarProfesorAsignado);

module.exports = router;
