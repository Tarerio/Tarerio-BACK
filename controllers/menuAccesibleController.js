// controllers/menuAccesibleController.js
const MenuAccesible = require('../models/relations/menuAccesible');
const Alumno = require('../models/student');

// Obtener menú accesible por nickname
exports.obtenerMenuAccesible = async (req, res) => {
  try {
    const { nickname } = req.params;
    const menuAccesible = await MenuAccesible.findOne({ where: { nickname } });
    if (menuAccesible) {
      res.status(200).json(menuAccesible);
    } else {
      res.status(404).json({ message: 'Menú accesible no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el menú accesible:', error);
    res.status(500).json({ message: 'Error al obtener el menú accesible' });
  }
};

// Crear menú accesible
exports.crearMenuAccesible = async (req, res) => {
  try {
    const { nickname, texto_titulo, texto_descripcion, paleta_colores } = req.body;
    const alumno = await Alumno.findOne({ where: { nickname } });
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    const menuAccesible = await MenuAccesible.create({ nickname, texto_titulo, texto_descripcion, paleta_colores });
    res.status(201).json(menuAccesible);
  } catch (error) {
    console.error('Error al crear el menú accesible:', error);
    res.status(500).json({ message: 'Error al crear el menú accesible' });
  }
};

// Actualizar menú accesible por nickname
exports.actualizarMenuAccesible = async (req, res) => {
  try {
    const { nickname } = req.params;
    const { texto_titulo, texto_descripcion, paleta_colores } = req.body;
    const menuAccesible = await MenuAccesible.findOne({ where: { nickname } });
    if (!menuAccesible) {
      return res.status(404).json({ message: 'Menú accesible no encontrado' });
    }
    await menuAccesible.update({ texto_titulo, texto_descripcion, paleta_colores });
    res.status(200).json(menuAccesible);
  } catch (error) {
    console.error('Error al actualizar el menú accesible:', error);
    res.status(500).json({ message: 'Error al actualizar el menú accesible' });
  }
};