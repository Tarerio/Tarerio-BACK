const express = require('express');
const app = express();
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Las rutas
app.use('/alumnos', studentRoutes);


const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});