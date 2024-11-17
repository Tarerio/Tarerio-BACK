const { TareaPeticion, Enunciado, Respuesta } = require("../models/tareaPeticion");
const Alumno = require("../models/student");
const sequelize = require('../config/database');
const AlumnoTareaPeticion = require("../models/relations/alumnoTareaPeticion");

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
    const { Titulo, Descripcion, Fecha_estimada_cierre, enunciados, creatorId } = req.body;

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // Crear la tarea 
        const nuevaTareaPeticion = await TareaPeticion.create({
            Titulo: Titulo,
            Descripcion: Descripcion,
            Fecha_estimada_cierre: Fecha_estimada_cierre,
            creatorId: creatorId,
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


//PATCH
// Actualizar solo la fecha estimada de cierre de una tarea
// http://localhost:3000/tareaPeticion/:id
exports.updateFechaCierreTarea = async (req, res) => {
    const { id } = req.params;
    const { Fecha_estimada_cierre } = req.body;

    try {
        // Buscar la tarea por su ID
        const tareaPeticion = await TareaPeticion.findByPk(id);

        // Verificar si la tarea existe
        if (!tareaPeticion) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        // Actualizar solo la fecha estimada de cierre
        await tareaPeticion.update({ Fecha_estimada_cierre });

        res.status(200).json({
            message: "Fecha estimada de cierre actualizada con éxito",
            tarea: tareaPeticion
        });
    } catch (err) {
        console.error("Error al actualizar la fecha estimada de cierre:", err);
        res.status(500).json({ message: "Error al actualizar la fecha estimada de cierre", error: err.message });
    }
};


// POST
// Asignar tarea a alumno
// http://localhost:3000/tareaPeticion/:id/asignar
exports.asignarTareaAlumno = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, Fecha_fin_asignacion, pasosPagina } = req.body;
  
    try {
      // Verificar si el alumno y la tarea existen
      const alumnoEncontrado = await Alumno.findByPk(id_usuario);
      const tareaEncontrada = await TareaPeticion.findByPk(id);
  
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
  
      let asignacion = await AlumnoTareaPeticion.create(asignacionData);
  
      return res.status(201).json({ message: "Tarea asignada con éxito", asignacion });
  
    } catch (error) {
      console.error("Error al asignar tarea a alumno:", error);
      return res.status(500).json({ message: "Error al asignar tarea a alumno", error: error.message });
    }
  };

// GET obtener tareas asignadas a un usuario, por nickname, y filtradas por "en proceso" (completado = false), "completadas" (completado = true) o "revisadas" (revisado = true)
// http://localhost:3000/tareaPeticion/:nickname/asignadas
// ejemplo -> http://localhost:3000/tareaPeticion/1/asignadas?estado=completado&fecha=2024-11-17

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
        } else if (estado === "revisado") {
            whereClause.revisado = true;
        } else {
            whereClause.completado = false;
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

        let tareasAsignadas = await AlumnoTareaPeticion.findAll({
            where: whereClause
        });

        res.status(200).json(tareasAsignadas);
    } catch (error) {
        console.error('Error al obtener las tareas asignadas:', error);
        res.status(500).json({ message: 'Error al obtener las tareas asignadas' });
    }
};


// PUT marcar tarea de juego como completada o revisada
// http://localhost:3000/tareaPeticion/marcarTarea/marcar

exports.marcarTareaPeticion = async (req, res) => {
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
  
      const tareaAsignada = await AlumnoTareaPeticion.findOne({
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
//http://localhost:3000/tareaPeticion/:id
exports.eliminarTareaPeticion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const tareaPeticion = await TareaPeticion.findByPk(id);
  
      if (!tareaPeticion) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
  
      const destruidas = await AlumnoTareaPeticion.destroy({
        where: {
          ID_tarea: id
        }
      });
  
      await tareaPeticion.destroy(); //Elimina enunciaods y respuestas por CASCADE
  
      return res.status(200).json({ message: "Tarea eliminada con éxito con " + destruidas + " asignaciones a alumnos eliminadas" });
  
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
    }
  }