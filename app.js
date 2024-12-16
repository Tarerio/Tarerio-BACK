const express = require('express');
const app = express();
const sequelize = require('./config/database');
const classroomRoutes = require('./routes/classroomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const tareaJuegoRoutes = require('./routes/tareaJuegoRoutes');
const tareaPorPasosRoutes = require('./routes/tareaPorPasosRoutes');
const tareaPeticionRoutes = require('./routes/tareaPeticionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const menuAccesibleRoutes = require('./routes/menuAccesibleRoutes');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');
const { Server } = require('socket.io');
const http = require('http');
const chatController = require('./controllers/chatController');
require('dotenv').config();

const server = http.createServer(app);

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true }));
app.use(morgan("combined"));

// Ruta de swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Las rutas
app.use('/alumnos', studentRoutes);
app.use('/profesores', teacherRoutes);
app.use('/tareaJuego', tareaJuegoRoutes);
app.use('/tareaPorPasos', tareaPorPasosRoutes);
app.use('/tareaPeticion', tareaPeticionRoutes);
app.use('/administradores', adminRoutes);
app.use('/aulas', classroomRoutes);
app.use('/menuAccesible', menuAccesibleRoutes);

const port = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', chatController.handleConnection);


sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});