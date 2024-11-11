const { TareaPorPasos, Subtarea } = require("../models/tareaPorPasos");
const sequelize = require('../config/database');

//GET 
// Una tarea por su ID
//http://localhost:3000/tareaPorPasos/:id
exports.getTareaPorPasosById = (req, res) => {
    const { id } = req.params;
    TareaPorPasos.findOne({
        where: {
            ID_tarea: id,
        },
        include: [{ model: Subtarea }] // Subtareas de la tarea
    })
        .then((tareaPorPasos) => {
            res.status(200).json(tareaPorPasos);
        })
        .catch((err) => {
            console.error("Error al buscar la tarea por pasos:", err);
            res.status(500).json({ message: "Error al buscar la tarea por pasos" });
        });
};

//GET
// Todas las tareas por pasos
//http://localhost:3000/tareaPorPasos
exports.getAllTareaPorPasos = (req, res) => {
    TareaPorPasos.findAll({
        include: [{ model: Subtarea }] // Incluir las subtareas
    })
        .then((tareaPorPasos) => {
            res.status(200).json(tareaPorPasos);
        })
        .catch((err) => {
            console.error("Error al buscar las tareas por pasos:", err);
            res.status(500).json({ message: "Error al buscar las tareas por pasos" });
        });
};

//POST
// Crear una tarea por pasos
//http://localhost:3000/tareaPorPasos
exports.crearTareaPorPasos = async (req, res) => {
    const { Titulo, Descripcion, Fecha_estimada_cierre, subtareas } = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // Crear la tarea 
        const nuevaTareaPorPasos = await TareaPorPasos.create({
            Titulo,
            Descripcion,
            Fecha_estimada_cierre
        }, { transaction });

        // Crear las subtareas asociadas a la tarea
        const subtareasConIDTarea = subtareas.map(subtarea => ({
            ...subtarea,
            ID_tarea: nuevaTareaPorPasos.ID_tarea
        }));

        // Crear las subtareas
        await Subtarea.bulkCreate(subtareasConIDTarea, { transaction });

        // Confirmar la transacción
        await transaction.commit();

        res.status(201).json(nuevaTareaPorPasos);
    } catch (err) {
        // Revertir la transacción en caso de error
        if (transaction) await transaction.rollback();
        console.error("Error al crear la tarea por pasos:", err);
        res.status(500).json({ message: "Error al crear la tarea y las subtareas" });
    }
};

//PUT
// Actualizar una tarea por pasos
//http://localhost:3000/tareaPorPasos/:id
exports.updateTareaPorPasos = async (req, res) => {
    const { id } = req.params;
    const { Titulo, Descripcion, Fecha_estimada_cierre, subtareas } = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {

        // TAREA A MODIFICAR
        const tareaPorPasos = await TareaPorPasos.findByPk(id); // Buscar la tarea por su ID

        if (!tareaPorPasos) { // Si no existe tarea con ese id
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }

        await tareaPorPasos.update({ // Actualizar la tarea
            Titulo,
            Descripcion,
            Fecha_estimada_cierre
        },
            { transaction }
        );

        // SUBTAREAS
        if (subtareas) {
            // 1. Eliminar las subtareas que no están en el nuevo array de subtareas

            // Obetener las subtareas asociadas a la tarea
            const subtareasAsociadasATarea = await Subtarea.findAll({ where: { ID_tarea: id } });

            // Obtener los IDs de las subtareas
            const idsExistentes = subtareasAsociadasATarea.map(subtarea => subtarea.ID_subtarea);

            // Obtener los IDs de las subtareas nuevas
            const idsNuevas = subtareas.map(subtarea => subtarea.ID_subtarea).filter(id => id);

            // Eliminar subtareas que no están en el nuevo array
            const subtareasAEliminar = idsExistentes.filter(id => !idsNuevas.includes(id));

            if (subtareasAEliminar.length > 0) {
                await Subtarea.destroy({ // Eliminar subtareas con los IDs obtenidos
                    where: {
                        ID_subtarea: subtareasAEliminar,
                        ID_tarea: id
                    },
                    transaction
                });
            }

            // 2. Actualizar o agregar subtareas
            for (const subtarea of subtareas) {
                if (subtarea.ID_subtarea) { // Acualizar

                    const subtareaExistente = await Subtarea.findByPk(subtarea.ID_subtarea);

                    if (subtareaExistente) {
                        await subtareaExistente.update({
                            Texto: subtarea.Texto,
                            Imagen: subtarea.Imagen,
                            Pictograma: subtarea.Pictograma,
                            Video: subtarea.Video
                        }, { transaction });
                    }
                } else {
                    await Subtarea.create({ // Agregar
                        ...subtarea,
                        ID_tarea: id
                    }, { transaction });
                }
            }
        }

        // Una vez actualizada la tarea y las subtareas confirmamos la transacción
        await transaction.commit();

        res.status(200).json(tareaPorPasos);
    } catch (err) {
        // Revertir la transacción en caso de error
        if (transaction) await transaction.rollback();

        console.error("Error al crear la tarea por pasos:", err);
        res.status(500).json({ message: "Error al crear la tarea y las subtareas" });
    }
};

/*
// DELETE
// Eliminar una tarea por pasos
// http://localhost:3000/tareaPorPasos/:id
exports.deleteTareaPorPasos = async (req, res) => {
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