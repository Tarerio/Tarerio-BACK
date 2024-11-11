// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * /alumnos/inicioSesionAlumno:
 *   post:
 *     summary: Iniciar sesión para alumnos
 *     description: Permite a un alumno iniciar sesión con su nickname y contraseña.
 *     tags: [Alumnos]
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
 *               patron:
 *                 type: string
 *                 description: Contraseña del alumno
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/inicioSesionAlumno', studentController.inicioSesionAlumno);

/**
 * @swagger
 * /alumnos/create:
 *   post:
 *     summary: Registrar un nuevo alumno
 *     tags: [Alumnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: El nickname del alumno
 *               patron:
 *                 type: string
 *                 description: La contraseña del alumno
 *               perfil:
 *                 type: object
 *                 properties:
 *                   texto:
 *                     type: boolean
 *                   imagenes:
 *                     type: boolean
 *                   pictograma:
 *                     type: boolean
 *                   video:
 *                     type: boolean
 *                   audio:
 *                     type: boolean
 *                   porDefecto:
 *                     type: string
 *                     enum: [audio, video, pictograma, texto, imagenes]
 *               image:
 *                 type: string
 *                 description: La imagen en formato base64
 *     responses:
 *       201:
 *         description: Alumno creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 alumno:
 *                   type: object
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error al crear el alumno
 */
router.post('/create', studentController.registrarAlumno);

/**
 * @swagger
 * /alumnos/{id_usuario}:
 *   put:
 *     summary: Actualizar un alumno existente
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del alumno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: El nickname del alumno
 *               patron:
 *                 type: string
 *                 description: La contraseña del alumno
 *               perfil:
 *                 type: object
 *                 properties:
 *                   texto:
 *                     type: boolean
 *                   imagenes:
 *                     type: boolean
 *                   pictograma:
 *                     type: boolean
 *                   video:
 *                     type: boolean
 *                   audio:
 *                     type: boolean
 *                   porDefecto:
 *                     type: string
 *                     enum: [audio, video, pictograma, texto, imagenes]
 *               image:
 *                 type: string
 *                 description: La imagen en formato base64
 *     responses:
 *       201:
 *         description: Alumno actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 alumno:
 *                   type: object
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al actualizar el alumno
 */
router.put('/:id_usuario', studentController.actualizarAlumno);

/**
 * @swagger
 * /alumnos:
 *   get:
 *     summary: Listar todos los alumnos
 *     description: Obtiene una lista de todos los alumnos registrados.
 *     tags: [Alumnos]
 *     parameters:
 *       - in: query
 *         name: aula
 *         schema:
 *           type: integer
 *         description: ID del aula para filtrar los alumnos. Use -1 para alumnos sin aula.
 *         required: false
 *     responses:
 *       200:
 *         description: Alumnos obtenidos correctamente
 *       500:
 *         description: Error al obtener los alumnos
 */
router.get('', studentController.listarAlumnos);

/**
 * @swagger
 * /alumnos/{id_usuario}:
 *   get:
 *     summary: Obtener un alumno por ID
 *     description: Obtiene los detalles de un alumno específico mediante su ID.
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alumno
 *     responses:
 *       200:
 *         description: Alumno obtenido correctamente
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al obtener el alumno
 */
router.get('/:id_usuario', studentController.obtenerAlumno);

/**
 * @swagger
 * /alumnos/nickname/{nickname}:
 *   get:
 *     summary: Obtener un alumno por nickname
 *     description: Busca y devuelve un alumno específico mediante su nickname.
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         required: true
 *         schema:
 *           type: string
 *         description: Nickname del alumno
 *     responses:
 *       200:
 *         description: Alumno obtenido correctamente
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al obtener el alumno
 */
router.get('/nickname/:nickname', studentController.obtenerAlumnoByNickname);

/**
 * @swagger
 * /alumnos/{id_usuario}:
 *   delete:
 *     summary: Eliminar un alumno
 *     description: Elimina un alumno existente mediante su ID.
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alumno a eliminar
 *     responses:
 *       200:
 *         description: Alumno eliminado correctamente
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al eliminar el alumno
 */
router.delete('/:id_usuario', studentController.eliminarAlumno);

module.exports = router;
