const { Sequelize } = require('sequelize');
require('dotenv').config();

// psql -h localhost -U postgres -d tarerio

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: 5432,
  logging: false // Puedes habilitar esto para ver los logs de SQL
});

module.exports = sequelize;