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

module.exports = router;
