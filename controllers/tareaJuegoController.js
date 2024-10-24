const TareaJuego = require("../models/tareaJuego");
const AlumnoTareaJuego = require("../models/relations/alumnoTareaJuego");

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
