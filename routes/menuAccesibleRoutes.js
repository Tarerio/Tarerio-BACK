// routes/menuAccesibleRoutes.js
const express = require('express');
const router = express.Router();
const menuAccesibleController = require('../controllers/menuAccesibleController.js');

/**
 * @swagger
 * /menuAccesible/{nickname}:
 *   get:
 *     summary: Obtener menú accesible por nickname
 *     tags: [MenuAccesible]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *         description: Nickname del alumno
 *     responses:
 *       200:
 *         description: Menú accesible encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_menu:
 *                   type: integer
 *                 nickname:
 *                   type: string
 *                 texto_titulo:
 *                   type: string
 *                 texto_descripcion:
 *                   type: string
 *                 paleta_colores:
 *                   type: string
 *       404:
 *         description: Menú accesible no encontrado
 *       500:
 *         description: Error al obtener el menú accesible
 */
router.get('/:nickname', menuAccesibleController.obtenerMenuAccesible);

/**
 * @swagger
 * /menuAccesible:
 *   post:
 *     summary: Crear menú accesible
 *     tags: [MenuAccesible]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               texto_titulo:
 *                 type: string
 *               texto_descripcion:
 *                 type: string
 *               paleta_colores:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menú accesible creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_menu:
 *                   type: integer
 *                 nickname:
 *                   type: string
 *                 texto_titulo:
 *                   type: string
 *                 texto_descripcion:
 *                   type: string
 *                 paleta_colores:
 *                   type: string
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al crear el menú accesible
 */
router.post('/', menuAccesibleController.crearMenuAccesible);

/**
 * @swagger
 * /menuAccesible/{nickname}:
 *   put:
 *     summary: Actualizar menú accesible por nickname
 *     tags: [MenuAccesible]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *         description: Nickname del alumno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto_titulo:
 *                 type: string
 *               texto_descripcion:
 *                 type: string
 *               paleta_colores:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menú accesible actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_menu:
 *                   type: integer
 *                 nickname:
 *                   type: string
 *                 texto_titulo:
 *                   type: string
 *                 texto_descripcion:
 *                   type: string
 *                 paleta_colores:
 *                   type: string
 *       404:
 *         description: Menú accesible no encontrado
 *       500:
 *         description: Error al actualizar el menú accesible
 */
router.put('/:nickname', menuAccesibleController.actualizarMenuAccesible);

module.exports = router;