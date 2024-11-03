const { TareaPeticion, Enunciado, Respuesta } = require("../models/tareaPeticion");
const sequelize = require('../config/database');

//GET 
// Una tarea por su ID
//http://localhost:3000/tareaPeticion/:id
exports.getTareaPeticionById = (req, res) => {
    const { id } = req.params;
    TareaPeticion.findOne({
        where: {
            ID_tarea: id,
        },
        include: {
            model: Enunciado, // Incluir el enunciado
            as: 'Enunciados',
            include: {
                model: Respuesta,
                as: 'Respuesta', // Incluir las respuestas
            },
        },
    })
        .then((tareaPeticion) => {
            res.status(200).json(tareaPeticion);
        })
        .catch((err) => {
            console.error("Error al buscar la tarea peticion:", err);
            res.status(500).json({ message: "Error al buscar la tarea peticion" });
        });

};

//GET
// Todas las tareas peticion
//http://localhost:3000/tareaPeticion
exports.getAllTareaPeticion = (req, res) => {
    TareaPeticion.findAll({
        include: {
            model: Enunciado, // Incluir el enunciado
            as: 'Enunciados',
            include: {
                model: Respuesta,
                as: 'Respuesta', // Incluir las respuestas
            },
        },
    })
        .then((tareaPeticion) => {
            res.status(200).json(tareaPeticion);
        })
        .catch((err) => {
            console.error("Error al buscar las tareas peticion:", err);
            res.status(500).json({ message: "Error al buscar las tareas peticion" });
        });
};

//POST
// Crear una tarea peticion
//http://localhost:3000/tareaPeticion
exports.crearTareaPeticion = async (req, res) => {
    const { Titulo, Descripcion, Fecha_estimada_cierre, enunciados } = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // Crear la tarea 
        const nuevaTareaPeticion = await TareaPeticion.create({
            Titulo,
            Descripcion,
            Fecha_estimada_cierre
        }, { transaction });

        // Crear los enunciados asociados a la tarea
        const enunciadosConIDTarea = enunciados.map(enunciado => ({
            ...enunciado,
            ID_tarea: nuevaTareaPeticion.ID_tarea,
        }));

        await Enunciado.bulkCreate(enunciadosConIDTarea, { transaction });

        // Commit
        await transaction.commit();

        res.status(201).json({ message: "Tarea peticion creada" });
    } catch (err) {
        console.error("Error al crear la tarea peticion:", err);
        await transaction.rollback();
        res.status(500).json({ message: "Error al crear la tarea peticion" });
    }
};

//PUT
// Actualizar una tarea peticion
//http://localhost:3000/tareaPeticion/:id
exports.updateTareaPeticion = async (req, res) => {
    const { id } = req.params;
    const { Titulo, Descripcion, Fecha_estimada_cierre, enunciados } = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // TAREA A MODIFICAR
        const tareaPeticion = await TareaPeticion.findByPk(id); // Buscar la tarea por su ID

        if (!tareaPeticion) {
            res.status(404).json({ error: "Tarea no encontrada" });
            return;
        }

        await tareaPeticion.update({
            Titulo,
            Descripcion,
            Fecha_estimada_cierre
        },
            { transaction }
        );

        // ENUNCIADOS
        if (enunciados) {
            // Eliminar los enunciados actuales
            await Enunciado.destroy({
                where: {
                    ID_tarea: id,
                },
                transaction,
            });

            // Crear los nuevos enunciados
            const enunciadosConIDTarea = enunciados.map(enunciado => ({
                ...enunciado,
                ID_tarea: id,
            }));

            await Enunciado.bulkCreate(enunciadosConIDTarea, { transaction });

        }

        // Una vez actualizada la tarea y las subtareas confirmamos la transacción
        await transaction.commit();

        res.status(200).json(tareaPeticion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
};

/*
// DELETE
// Eliminar una tarea peticion
// http://localhost:3000/tareaPeticion/:id
exports.deleteTareaPeticion = async (req, res) => {
    const { id } = req.params;

    try {
        const tareaPorPasos = await TareaPorPasos.findByPk(id);

        if (!tareaPorPasos) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        await tareaPorPasos.destroy();
        res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (err) {
        console.error("Error al eliminar la tarea:", err);
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
};
*/