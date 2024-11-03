const express = require('express');
const app = express();
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const tareaJuegoRoutes = require('./routes/tareaJuegoRoutes');
const tareaPorPasosRoutes = require('./routes/tareaPorPasosRoutes');
const tareaPeticionRoutes = require('./routes/tareaPeticionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
require('dotenv').config();

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true }));

// Las rutas
app.use('/alumnos', studentRoutes);
app.use('/profesores', teacherRoutes);
app.use('/tareaJuego', tareaJuegoRoutes);
app.use('/tareaPorPasos', tareaPorPasosRoutes);
app.use('/tareaPeticion', tareaPeticionRoutes);
app.use('/administradores', adminRoutes);
app.use('/aulas', classroomRoutes);

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});