const Profesor = require('../models/teacher');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

//POST
// http://localhost:3000/profesores/inicioSesionProfesor
exports.inicioSesionProfesor = async (req, res) => {
    const { nickname, contrasenia } = req.body;

    if (!nickname || !contrasenia) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Nickname y contraseña son requeridos' 
        });
    }

    const decodedNickname = decodeURIComponent(nickname);
    const decodedContrasenia = decodeURIComponent(contrasenia);

    Profesor.findOne({
        where: { nickname: decodedNickname }
    }).then(async teacher => {
        if (!teacher) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor'
            });
        }

        const contraseniaValida = await bcrypt.compare(decodedContrasenia, teacher.contrasenia);

        if (!contraseniaValida) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión correcto',
            profesor: teacher
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al iniciar sesión',
            error: err
        });
    });
}

//GET
// http://localhost:3000/profesores
exports.listarProfesores = (req, res) => {

    const { nickname } = req.query;

    let whereClause = {};

    if (aula) {
        if (aula === '-1') {
            whereClause.id_aula = null;
        } else {
            whereClause.id_aula = aula;
        }
    }

    if (nickname && nickname.trim() !== '') {
        whereClause.nickname = {
            [Op.like]: `%${nickname}%`
        };
    }

    Profesor.findAll({ where: whereClause }).then(users => {
        res.status(200).json({
            status: 'success',
            message: 'Profesores obtenidos correctamente',
            usuarios: users,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los profesores',
            error: err
        });
    });
}

//GET
// http://localhost:3000/profesores/filtered?nickname=algo
exports.filteredObtenerProfesores = async (req, res) => {
    const { nickname } = req.query;

    console.log('nickname:', nickname);

    let whereClause = {};

    if (nickname) {
        whereClause.nickname = {
            [Sequelize.Op.iLike]: `%${nickname}%`
        };
    }

    Profesor.findAll({
        where: whereClause
    })
    .then(profesores => {
        res.json(profesores);
    })
    .catch(error => {
        console.error('Error al filtrar profesores:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    });
};

//GET
// http://localhost:3000/profesores/:id_usuario
exports.obtenerProfesor = async (req, res) => {
    const { id_usuario } = req.params;

    Profesor.findOne({
        where: { id_usuario }
    }).then(teacher => {
        if (!teacher) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'Profesor obtenido correctamente',
                profesor: teacher,
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el profesor',
            error: err
        });
    });

};

//POST
// http://localhost:3000/profesores/create
exports.registrarProfesor = async (req, res) => {
    const { nickname, patron, image} = req.body;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/;

    if (!nickname || !patron) {
        return res.status(400).json({ 
            status: 'error',
            codigo_error: 1,
            message: 'Nickname y contraseña son requeridos' 
        });
    }else if(patron.length < 8){
        return res.status(400).json({ 
            status: 'error',
            codigo_error: 2,
            message: 'La contraseña debe tener al menos 8 caracteres'
        });
    }else if (!regex.test(patron)) {
        return res.status(400).json({
            status: 'error',
            codigo_error: 3,
            message: 'La contraseña debe contener al menos una mayúscula, un número y un carácter especial'
        });
    }

    const coste = 1; // Puedes ajustar el costo de hashing (más alto = más seguro, pero más lento)
    const hashedPatron = await bcrypt.hash(patron, coste);

    Profesor.create({
        nickname: nickname,
        contrasenia: hashedPatron,
        imagenBase64 : image
    }).then(teacher => {
        res.status(201).json({
            status: 'success',
            message: 'Profesor creado correctamente',
            profesor: teacher,
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            codigo_error: 4,
            message: 'Error al crear el profesor',
            error: err
        });
    });
};

//PUT
// http://localhost:3000/profesores/:id_usuario
exports.actualizarProfesor = (req, res) => {
    const { nickname, image } = req.body;
    const { id_usuario } = req.params;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/;

    Profesor.findOne({
        where: { id_usuario }
    }).then(async teacher => {
        if (!teacher) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor que se quiere actualizar'
            });
        }

        const coste = 1; // Puedes ajustar el costo de hashing (más alto = más seguro, pero más lento)
        const hashedPatron = await bcrypt.hash(patron, coste);

        return teacher.update({
            nickname: nickname,
            contrasenia: hashedPatron,
            imagenBase64: image??teacher.imagenBase64
        });
    }).then(updatedTeacher => {
        res.status(201).json({
            status: 'success',
            message: 'Profesor actualizado correctamente',
            profesor: updatedTeacher
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el profesor',
            error: err
        });
    });
};

//DELETE
// http://localhost:3000/profesores/:id_usuario
exports.eliminarProfesor = (req, res) => {
    const { id_usuario } = req.params;

    Profesor.destroy({
        where: { id_usuario }
    }).then(deletedRows => {
        if (!deletedRows) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor que se quiere eliminar'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Profesor eliminado correctamente'
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el profesor',
            error: err
        });
    });
}

// PUT
// http://localhost:3000/profesores/:id_usuario/cambiarContrasenia
exports.cambiarContrasenia = async (req, res) => {
    const { id_usuario } = req.params;
    const { contraseniaActual, contraseniaNueva } = req.body;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/;

    if(contraseniaNueva.length < 8) {
        return res.status(400).json({ 
            status: 'error',
            message: 'La contraseña debe tener al menos 8 caracteres' 
        });
    }else if (contraseniaNueva && !regex.test(contraseniaNueva)) {
        return res.status(400).json({
            status: 'error',
            message: 'La contraseña debe contener al menos una mayúscula, un número y un carácter especial'
        });
    }

    Profesor.findOne({
        where: { id_usuario }
    }).then(async teacher => {
        if (!teacher) {
            return res.status(404).json({
                status: 'error',
                message: 'No se ha encontrado el profesor'
            });
        }

        const contraseniaValida = await bcrypt.compare(contraseniaActual, teacher.contrasenia);

        if (!contraseniaValida) {
            return res.status(401).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }

        const coste = 1; 
        const hashedPatron = await bcrypt.hash(contraseniaNueva, coste);

        teacher.update({
            contrasenia: hashedPatron
        }).then(updatedTeacher => {
            res.status(201).json({
                status: 'success',
                message: 'Contraseña actualizada correctamente',
                profesor: updatedTeacher
            });
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al cambiar la contraseña',
            error: err
        });
    });
}

//GET
exports.obtenerAulario = async (req, res) => {
    const { nickname } = req.params;
    const decodedNickname = decodeURIComponent(nickname);

    // Obtengo el profesor para extraer su "id_usuario"

    const teacher = await Profesor.findOne({
        where: { nickname: decodedNickname }
    });

    if (!teacher) {
        return res.status(404).json({
            status: 'error',
            message: 'No se ha encontrado el profesor'
        });
    }

    // Obtengo el aula buscando en AulaProfesor por id_usuario : extraigo id_aula y así busco el aula
    const AulaProfesor = require('../models/relations/AulaProfesor');

    const aulaProfesor = await AulaProfesor.findOne({
        where: { id_usuario: teacher.id_usuario }
    });

    if (!aulaProfesor) {
        return res.status(404).json({
            status: 'error',
            message: 'No se ha encontrado el aula'
        });
    }

    const Aula = require('../models/classroom');

    const aula = await Aula.findOne({
        where: { id_aula: aulaProfesor.id_aula }
    });

    if (!aula) {
        return res.status(404).json({
            status: 'error',
            message: 'No se ha encontrado el aula'
        });
    }

    // Obtengo los alumnos del aula buscando en Alumnos "id_aula" : extraigo id_usuario y así busco los alumnos

    const Alumno = require('../models/student');

    const alumnos = await Alumno.findAll({
        where: { id_aula: aula.id_aula }
    });

    res.status(200).json({
        status: 'success',
        message: 'Aula y alumnos obtenidos correctamente',
        aula,
        alumnos
    });
};

// POST
exports.crearPedidoMaterial = async (req, res) => {
    const { nickname, materiales } = req.body;

    if (!nickname || !materiales) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Nickname y materiales son requeridos' 
        });
    }

    const PedidoMaterial = require('../models/relations/pedidoMaterial');

    const fecha_pedido = new Date();

    const decodedNickname = decodeURIComponent(nickname);

    PedidoMaterial.create({
        nickname: decodedNickname,
        fecha_pedido,
        materiales
    }).then(pedido => {
        res.status(201).json({
            status: 'success',
            message: 'Pedido de material creado correctamente',
            pedido
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el pedido de material',
            error: err
        });
    });
};

// GET
// router.get('/pedidoMaterial/obtener/:nickname', teacherController.obtenerPedidosMaterial);
exports.obtenerPedidosMaterial = async (req, res) => {
    const { nickname } = req.params;
    const decodedNickname = decodeURIComponent(nickname);

    const PedidoMaterial = require('../models/relations/pedidoMaterial');

    const pedidos = await PedidoMaterial.findAll({
        where: { nickname: decodedNickname }
    });

    res.status(200).json({
        status: 'success',
        message: 'Pedidos de material obtenidos correctamente',
        pedidos
    });
};

// GET
exports.obtenerPedidoMaterial = async (req, res) => {
    const { id_pedido } = req.params;

    const PedidoMaterial = require('../models/relations/pedidoMaterial');

    const pedido = await PedidoMaterial.findOne({
        where: { id_pedido }
    });

    if (!pedido) {
        return res.status(404).json({
            status: 'error',
            message: 'No se ha encontrado el pedido de material'
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Pedido de material obtenido correctamente',
        pedido
    });
};

// PUT 
// router.put('/pedidoMaterial/marcarPedido/:id_pedido', teacherController.actualizarPedidoMaterial);

exports.marcarPedido = async (req, res) => {
    const { id_pedido } = req.params;
    const estado = "Pedido";

    const PedidoMaterial = require('../models/relations/pedidoMaterial');

    const pedido = await PedidoMaterial.findOne({
        where: { id_pedido }
    });

    if (!pedido) {
        return res.status(404).json({
            status: 'error',
            message: 'No se ha encontrado el pedido de material'
        });
    }

    pedido.update({
        estado
    }).then(updatedPedido => {
        res.status(200).json({
            status: 'success',
            message: 'Pedido de material actualizado correctamente',
            pedido: updatedPedido
        });
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el pedido de material',
            error: err
        });
    });
};
