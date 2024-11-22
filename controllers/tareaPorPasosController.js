const { TareaPorPasos, Subtarea } = require("../models/tareaPorPasos");
const sequelize = require('../config/database');
const Alumno = require('../models/student');
const AlumnoTareaPorPasos = require('../models/relations/alumnoTareaPorPasos');
const { Op, where } = require('sequelize');


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
// http://localhost:3000/tareaPorPasos/filtered?nombreTarea=algo
exports.filteredGetAllTareaPorPasos = async (req, res) => {

    const { nombreTarea } = req.query;

    let whereClause = {};
    
    if (nombreTarea) {
        whereClause.Titulo = {
            [Op.iLike]: `%${nombreTarea}%` // Utiliza LIKE para buscar coincidencias parciales (case-insensitive)
        };
    }

    TareaPorPasos.findAll({
        where: whereClause,
        include: [{ model: Subtarea }] // Incluir las subtareas
    })
    .then(tareaPorPasos => {
        res.json(tareaPorPasos);
    })
    .catch(error => {
        console.error('Error al filtrar las tareas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
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
    const { Titulo, Descripcion, Fecha_estimada_cierre, subtareas, creatorId, imagen} = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // Crear la tarea 
        const nuevaTareaPorPasos = await TareaPorPasos.create({
            Titulo: Titulo,
            Descripcion: Descripcion,
            Fecha_estimada_cierre: Fecha_estimada_cierre,
            creatorId: creatorId,
            imagenBase64: imagen
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
    const { Titulo, Descripcion, Fecha_estimada_cierre, subtareas, imagen} = req.body;

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
            Fecha_estimada_cierre,
            imagenBase64: imagen
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

//PATCH
// Actualizar solo la fecha estimada de cierre de una tarea
// http://localhost:3000/tareaPorPasos/:id
exports.updateFechaCierreTarea = async (req, res) => {
    const { id } = req.params;
    const { Fecha_estimada_cierre } = req.body;

    try {
        // Buscar la tarea por su ID
        const tareaPorPasos = await TareaPorPasos.findByPk(id);

        // Verificar si la tarea existe
        if (!tareaPorPasos) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        // Actualizar solo la fecha estimada de cierre
        await tareaPorPasos.update({ Fecha_estimada_cierre });

        res.status(200).json({
            message: "Fecha estimada de cierre actualizada con éxito",
            tarea: tareaPorPasos
        });
    } catch (err) {
        console.error("Error al actualizar la fecha estimada de cierre:", err);
        res.status(500).json({ message: "Error al actualizar la fecha estimada de cierre", error: err.message });
    }
};

// POST
// Asignar tarea a alumno
// http://localhost:3000/tareaPorPasos/:id/asignar
exports.asignarTareaAlumno = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, Fecha_fin_asignacion, pasosPagina } = req.body;
  
    try {
      // Verificar si el alumno y la tarea existen
      const alumnoEncontrado = await Alumno.findByPk(id_usuario);
      const tareaEncontrada = await TareaPorPasos.findByPk(id);
  
      if (!alumnoEncontrado) {
        return res.status(404).json({ message: "Alumno no encontrado" });
      }
  
      if (!tareaEncontrada) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
  
      // Crear la asignación con o sin pasosPagina
      let asignacionData = {
        id_usuario: id_usuario,
        ID_tarea: id,
        Fecha_fin_asignacion: Fecha_fin_asignacion,
        completado: false,
        revisado: false
      };
  
      if (pasosPagina !== undefined) {
        asignacionData.pasosPagina = pasosPagina;
      }
  
      let asignacion = await AlumnoTareaPorPasos.create(asignacionData);
  
      return res.status(201).json({ message: "Tarea asignada con éxito", asignacion });
  
    } catch (error) {
      console.error("Error al asignar tarea a alumno:", error);
      return res.status(500).json({ message: "Error al asignar tarea a alumno", error: error.message });
    }
  };

// GET obtener tareas asignadas a un usuario, por nickname, y filtradas por "en proceso" (completado = false), "completadas" (completado = true) o "revisadas" (revisado = true)
// http://localhost:3000/tareaPorPasos/:nickname/asignadas
// ejemplo -> http://localhost:3000/tareaPorPasos/1/asignadas?estado=completado&fecha=2024-11-17

exports.getTareasAsignadasByAlumno = async (req, res) => {
    const { nickname } = req.params;
    const { estado, fecha } = req.query;

    try {
        // Verificar si el alumno existe
        const alumnoEncontrado = await Alumno.findOne({
            where: { nickname }
        });

        if (!alumnoEncontrado) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }

        // Filtrar las tareas asignadas al alumno
        let whereClause = { id_usuario: alumnoEncontrado.id_usuario };

        if (estado === "completado") {
            whereClause.completado = true;
            whereClause.revisado = false;
        } else if (estado === "revisado") {
            whereClause.revisado = true;
        } else if (estado === "en_proceso") {
            whereClause.completado = false;
            whereClause.revisado = false;
          }

        if (fecha) {
            const startDate = new Date(fecha);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(fecha);
            endDate.setHours(23, 59, 59, 999);

            whereClause.Fecha_fin_asignacion = {
                [Op.between]: [startDate, endDate]
            };
        }

        let tareasAsignadas = await AlumnoTareaPorPasos.findAll({
            where: whereClause
        });

        res.status(200).json(tareasAsignadas);
    } catch (error) {
        console.error('Error al obtener las tareas asignadas:', error);
        res.status(500).json({ message: 'Error al obtener las tareas asignadas' });
    }
};

// PUT marcar tarea de juego como completada o revisada
// http://localhost:3000/tareaPorPasos/marcarTarea/marcar

exports.marcarTareaPorPasos = async (req, res) => {
    const { nickname, ID_tarea } = req.body;
    const { completado, revisado } = req.body;
  
    try {
      // Buscar el alumno por nickname
      const alumnoEncontrado = await Alumno.findOne({
        where: { nickname }
      });
  
      if (!alumnoEncontrado) {
        return res.status(404).json({ message: "Alumno no encontrado" });
      }
  
      // Buscar la tarea de juego asignada al alumno
      console.log(alumnoEncontrado.id_usuario);
      console.log(ID_tarea);
  
      const tareaAsignada = await AlumnoTareaPorPasos.findOne({
        where: {
          id_usuario: alumnoEncontrado.id_usuario,
          ID_tarea: ID_tarea
        }
      });
  
      if (!tareaAsignada) {
        return res.status(404).json({ message: f`Tarea no encontrada para el alumno ${id_usuario}, tarea ${ID_tarea}` });
      }
  
      // Actualizar el estado de la tarea
      if (completado !== undefined) {
        tareaAsignada.completado = completado;
      }
      if (revisado !== undefined) {
        tareaAsignada.revisado = revisado;
      }
  
      await tareaAsignada.save();
  
      res.status(200).json({
        message: "Tarea de juego marcada exitosamente",
        tarea: tareaAsignada
      });
    } catch (error) {
      console.error("Error al marcar la tarea de juego:", error);
      res.status(500).json({ message: "Error al marcar la tarea de juego", error: error.message });
    }
  };

  
//DELETE
//http://localhost:3000/tareaPorPasos/:id
exports.eliminarTareaPorPasos = async (req, res) => {
    const { id } = req.params;

    try {
        const tareaPorPasos = await TareaPorPasos.findByPk(id);

        if (!tareaPorPasos) {
        return res.status(404).json({ message: "Tarea no encontrada" });
        }

        const destruidas = await AlumnoTareaPorPasos.destroy({
        where: {
            ID_tarea: id
        }
        });

        await tareaPorPasos.destroy();

        return res.status(200).json({ message: "Tarea eliminada con éxito con " + destruidas + " asignaciones a alumnos eliminadas" });

    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
    }
}