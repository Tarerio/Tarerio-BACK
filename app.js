const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(express.json());

// npm run dev -> HOT RELOAD

// Las rutas
app.use('/usuarios', userRoutes);


const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});