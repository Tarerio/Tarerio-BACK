const TareaJuego = require("../models/tareaJuego");
const AlumnoTareaJuego = require("../models/relations/alumnoTareaJuego");
const Alumno = require("../models/student");
const { Op, where } = require('sequelize');
const sequelize = require('../config/database');


//GET
// http://localhost:3000/tareaJuego/filtered?nombreTarea=algo
exports.filteredGetAllTareaPeticion = async (req, res) => {

  const { nombreTarea } = req.query;

  let whereClause = {};

  if (nombreTarea) {
    whereClause.Titulo = {
      [Op.iLike]: `%${nombreTarea}%` // Utiliza LIKE para buscar coincidencias parciales (case-insensitive)
    };
  }

  TareaJuego.findAll({
    where: whereClause,
  })
    .then(tareaJuego => {
      res.json(tareaJuego);
    })
    .catch(error => {
      console.error('Error al filtrar las tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

//GET
//http://localhost:3000/tareaJuego/:id
exports.getTareaJuegoById = (req, res) => {
  const { id } = req.params;
  TareaJuego.findOne({
    where: {
      ID_tarea: id,
    },
  })
    .then((tareaJuego) => {
      res.status(200).json(tareaJuego);
    })
    .catch((err) => {
      console.error("Error al buscar la tarea:", err);
      res.status(500).json({ message: "Error al buscar la tarea" });
    });
};

//GET
//http://localhost:3000/tareaJuego
exports.getAllTareasJuego = (req, res) => {
  TareaJuego.findAll()
    .then((tareaJuegos) => {
      res.status(200).json(tareaJuegos);
    })
    .catch((err) => {
      console.error("Error al buscar las tareas:", err);
      res.status(500).json({ message: "Error al buscar las tareas" });
    });
};

//POST
//http://localhost:3000/tareaJuego
exports.crearTareaJuego = (req, res) => {
  const { Titulo, Descripcion, Fecha_estimada_cierre, Enlace, creatorId, imagen } = req.body;
  TareaJuego.create({
    Titulo: Titulo,
    Descripcion: Descripcion,
    Fecha_estimada_cierre: Fecha_estimada_cierre,
    Enlace: Enlace,
    creatorId: creatorId,
    imagenBase64: imagen
  })
    .then((tareaJuego) => {
      res.status(201).json(tareaJuego);
    })
    .catch((err) => {
      console.error("Error al crear la tarea:", err);
      res.status(500).json({ message: "Error al crear la tarea" });
    });
};

//PUT
//http://localhost:3000/tareaJuego/:id
exports.updateTareaJuego = (req, res) => {
  const { id } = req.params;
  const { Titulo, Descripcion, Fecha_estimada_cierre, Enlace, imagen } = req.body;
  TareaJuego.update(
    {
      Titulo: Titulo,
      Descripcion: Descripcion,
      Fecha_estimada_cierre: Fecha_estimada_cierre,
      Enlace: Enlace,
      imagenBase64: imagen
    },
    {
      where: {
        ID_tarea: id,
      },
    }
  )
    .then((numberOfTareasJuegoUpdated) => {
      if (numberOfTareasJuegoUpdated[0] === 0) {
        res.status(404).json({ message: "Tarea no encontrada" });
      } else {
        TareaJuego.findByPk(id).then((tareaJuego) => {
          res.status(200).json(tareaJuego);
        });
      }
    })
    .catch((err) => {
      console.error("Error al actualizar la tarea:", err);
      res.status(500).json({ message: "Error al actualizar la tarea" });
    });
};


//PATCH
// Actualizar solo la fecha estimada de cierre de una tarea
// http://localhost:3000/tareaJuego/:id
exports.updateFechaCierreTarea = async (req, res) => {
  const { id } = req.params;
  const { Fecha_estimada_cierre } = req.body;

  try {
    // Buscar la tarea por su ID
    const tareaJuego = await TareaJuego.findByPk(id);

    // Verificar si la tarea existe
    if (!tareaJuego) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Actualizar solo la fecha estimada de cierre
    await tareaJuego.update({ Fecha_estimada_cierre });

    res.status(200).json({
      message: "Fecha estimada de cierre actualizada con éxito",
      tarea: tareaJuego
    });
  } catch (err) {
    console.error("Error al actualizar la fecha estimada de cierre:", err);
    res.status(500).json({ message: "Error al actualizar la fecha estimada de cierre", error: err.message });
  }
};

//POST
// Asignar tarea a alumno
//http://localhost:3000/tareaJuego/:id/asignar
exports.asignarTareaAlumno = async (req, res) => {
  const { id } = req.params;
  const { id_usuario, Fecha_fin_asignacion } = req.body;

  try {
    // Verificar si el alumno y la tarea existen
    const alumnoEncontrado = await Alumno.findByPk(id_usuario);
    const tareaEncontrada = await TareaJuego.findByPk(id);

    if (!alumnoEncontrado) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    if (!tareaEncontrada) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    let asignacion = await AlumnoTareaJuego.create({
      id_usuario: id_usuario,
      ID_tarea: id,
      Fecha_fin_asignacion: Fecha_fin_asignacion,
      completado: false,
      revisado: false
    });

    return res.status(201).json({ message: "Tarea asignada con éxito", asignacion });

  } catch (error) {
    console.error("Error al asignar tarea a alumno:", error);
    return res.status(500).json({ message: "Error al asignar tarea a alumno", error: error.message });
  }
};

//DELETE
//http://localhost:3000/tareaJuego/:id
exports.eliminarTareaJuego = async (req, res) => {
  const { id } = req.params;

  try {
    const tareaJuego = await TareaJuego.findByPk(id);

    if (!tareaJuego) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const destruidas = await AlumnoTareaJuego.destroy({
      where: {
        ID_tarea: id
      }
    });

    await tareaJuego.destroy();

    return res.status(200).json({ message: "Tarea eliminada con éxito. " + destruidas + " asignaciones a alumnos eliminadas" });

  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
  }
}

// GET obtener tareas asignadas a un usuario, por nickname, y filtradas por "en proceso" (completado = false), "completadas" (completado = true) o "revisadas" (revisado = true)
// http://localhost:3000/tareaJuego/:id_usuario/asignadas
// ejemplo -> http://localhost:3000/tareaJuego/1/asignadas?estado=completado&fecha=2024-11-17

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

    let tareasAsignadas = await AlumnoTareaJuego.findAll({
      where: whereClause
    });

    res.status(200).json(tareasAsignadas);
  } catch (error) {
    console.error('Error al obtener las tareas asignadas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas asignadas' });
  }
};

// PUT marcar tarea de juego como completada o revisada
// http://localhost:3000/tareaJuego/marcarTarea/marcar

exports.marcarTareaJuego = async (req, res) => {
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

    const tareaAsignada = await AlumnoTareaJuego.findOne({
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