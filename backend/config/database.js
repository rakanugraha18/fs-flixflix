require("dotenv").config();
const { Sequelize } = require("sequelize", "mysql2");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {},
    logging: false, // Nonaktifkan logging query SQL
  }
);

module.exports = sequelize;
