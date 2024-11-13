const TareaJuego = require("../models/tareaJuego");
const AlumnoTareaJuego = require("../models/relations/alumnoTareaJuego");
const Alumno = require("../models/student");

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
  const { Titulo, Descripcion, Fecha_estimada_cierre, Enlace, creatorId } = req.body;
  TareaJuego.create({
    Titulo: Titulo,
    Descripcion: Descripcion,
    Fecha_estimada_cierre: Fecha_estimada_cierre,
    Enlace: Enlace,
    creatorId: creatorId
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
  const { Titulo, Descripcion, Fecha_estimada_cierre, Enlace } = req.body;
  TareaJuego.update(
    {
        Titulo: Titulo,
        Descripcion: Descripcion,
        Fecha_estimada_cierre: Fecha_estimada_cierre,
        Enlace: Enlace,
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
  const { id_usuario, Fecha_fin_asignacion} = req.body;

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
