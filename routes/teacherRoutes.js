const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

//POST iniciar sesión
/**
 * @swagger
 * /profesores/inicioSesionProfesor:
 *   post:
 *     summary: Iniciar sesión de un profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: Nickname del profesor
 *               contrasenia:
 *                 type: string
 *                 description: Contraseña del profesor
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Nickname o contraseña no proporcionados
 *       404:
 *         description: Profesor no encontrado
 *       401:
 *         description: Contraseña incorrecta
 *       500:
 *         description: Error del servidor
 */
router.post('/inicioSesionProfesor', teacherController.inicioSesionProfesor);

//POST registrar profesor
/**
 * @swagger
 * /profesores/crear:
 *   post:
 *     summary: Registrar un nuevo profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               patron:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Imagen del profesor en formato Base64
 *     responses:
 *       201:
 *         description: Profesor creado correctamente
 *       400:
 *         description: Error en los datos de entrada (nickname o contraseña)
 *       500:
 *         description: Error del servidor
 */
router.post('/crear', teacherController.registrarProfesor);

//GET listar profesores
/**
 * @swagger
 * /profesores:
 *   get:
 *     summary: Listar todos los profesores
 *     tags: [Profesores]
 *     responses:
 *       200:
 *         description: Lista de profesores obtenida correctamente
 *       500:
 *         description: Error del servidor
 */
router.get('', teacherController.listarProfesores);

router.get('/filtered', teacherController.filteredObtenerProfesores);

//GET obtener profesor por ID
/**
 * @swagger
 * /profesores/{id_usuario}:
 *   get:
 *     summary: Obtener un profesor por ID
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Profesor obtenido correctamente
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id_usuario', teacherController.obtenerProfesor);

//PUT actualizar profesor
/**
 * @swagger
 * /profesores/{id_usuario}:
 *   put:
 *     summary: Actualizar los datos de un profesor
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Imagen del profesor en formato Base64
 *     responses:
 *       201:
 *         description: Profesor actualizado correctamente
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id_usuario', teacherController.actualizarProfesor);

//DELETE eliminar profesor
/**
 * @swagger
 * /profesores/{id_usuario}:
 *   delete:
 *     summary: Eliminar un profesor por ID
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Profesor eliminado correctamente
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id_usuario', teacherController.eliminarProfesor);

//PUT cambiar contraseña del profesor
/**
 * @swagger
 * /profesores/{id_usuario}/cambiarContrasenia:
 *   put:
 *     summary: Cambiar la contraseña de un profesor
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contraseniaActual:
 *                 type: string
 *                 description: Contraseña actual del profesor
 *               contraseniaNueva:
 *                 type: string
 *                 description: Nueva contraseña del profesor
 *     responses:
 *       201:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error en la nueva contraseña
 *       404:
 *         description: Profesor no encontrado
 *       401:
 *         description: Contraseña actual incorrecta
 *       500:
 *         description: Error del servidor
 */
router.put('/:id_usuario/cambiarContrasenia', teacherController.cambiarContrasenia);


/**
 * @swagger
 * /profesores/aulario/obtener/{nickname}:
 *   get:
 *     summary: Obtener aula y alumnos de la misma
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *         description: Nickname del profesor
 *     responses:
 *       200:
 *         description: Aula y alumnos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 aula:
 *                   type: object
 *                 alumnos:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No se ha encontrado el profesor o el aula
 *       500:
 *         description: Error del servidor
 */
router.get('/aulario/obtener/:nickname', teacherController.obtenerAulario);

/**
 * @swagger
 * /profesores/pedidoMaterial/crear:
 *   post:
 *     summary: Crear pedido de material
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: Nickname del profesor
 *               materiales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido de material creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 pedido:
 *                   type: object
 *       400:
 *         description: Nickname y materiales son requeridos
 *       500:
 *         description: Error al crear el pedido de material
 */
router.post('/pedidoMaterial/crear', teacherController.crearPedidoMaterial);

/**
 * @swagger
 * /profesores/pedidoMaterial/obtener/{nickname}:
 *   get:
 *     summary: Obtener pedidos de material por nickname
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *         description: Nickname del profesor
 *     responses:
 *       200:
 *         description: Pedidos de material obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 pedidos:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No se ha encontrado el profesor o los pedidos
 *       500:
 *         description: Error del servidor
 */
router.get('/pedidoMaterial/obtener/:nickname', teacherController.obtenerPedidosMaterial);

/**
 * @swagger
 * /profesores/pedidoMaterial/obtenerPorId/{id_pedido}:
 *   get:
 *     summary: Obtener pedido de material por id_pedido
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido de material
 *     responses:
 *       200:
 *         description: Pedido de material obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 pedido:
 *                   type: object
 *       404:
 *         description: No se ha encontrado el pedido de material
 *       500:
 *         description: Error del servidor
 */
router.get('/pedidoMaterial/obtenerPorId/:id_pedido', teacherController.obtenerPedidoMaterial);

//PUT actualizar pedido de material -> estado a "Pedido"
/**
 * @swagger
 * /profesores/pedidoMaterial/marcarPedido/{id_pedido}:
 *   put:
 *     summary: Actualizar pedido de material
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido de material
 *     responses:
 *       200:
 *         description: Pedido de material actualizado correctamente
 *       404:
 *         description: No se ha encontrado el pedido de material
 *       500:
 *         description: Error del servidor
 */
router.put('/pedidoMaterial/marcarPedido/:id_pedido', teacherController.marcarPedido);


module.exports = router;
