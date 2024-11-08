const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Endpoints de la API de administradores

/**
 * @swagger
 * /administradores/inicioSesionAdministrador:
 *   post:
 *     summary: Iniciar sesión de administrador
 *     description: Permite iniciar sesión de un administrador utilizando nickname y contraseña
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: El nombre de usuario del administrador
 *               contrasenia:
 *                 type: string
 *                 description: La contraseña del administrador
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 administrador:
 *                   type: object
 *       400:
 *         description: Faltan nickname o contraseña
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Admin no encontrado
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/inicioSesionAdministrador', adminController.inicioSesionAdmin);

/**
 * @swagger
 * /administradores/crear:
 *   post:
 *     summary: Crear un nuevo administrador
 *     description: Registra un nuevo administrador con un nickname y una contraseña
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: El nombre de usuario deseado para el nuevo administrador
 *               contrasenia:
 *                 type: string
 *                 description: La contraseña del nuevo administrador
 *     responses:
 *       201:
 *         description: Admin creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 administrador:
 *                   type: object
 *       400:
 *         description: Nickname o contraseña faltantes o inválidos
 *       500:
 *         description: Error al crear el admin
 */
router.post('/crear', adminController.registrarAdmin);

module.exports = router;