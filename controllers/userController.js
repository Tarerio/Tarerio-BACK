const User = require('../models/user');

// Métodos CRUD...

exports.inicioSesion = (req, res) => {
  // Simulación de inicio de sesión
  const { nickname, contrasenia } = req.query;

  if (nickname === 'test' && contrasenia === 'test') {
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { nickname } });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};