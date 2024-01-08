require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "flixflix_dev",
  "5vcnj4tvgn8xordktp9k",
  "pscale_pw_XCVlqTDwL2a80OZwMT95Y5syIG5lmya6t0oOgM00tKI",
  {
    host: "aws.connect.psdb.cloud",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
    logging: false, // Nonaktifkan logging query SQL
  }
);

module.exports = sequelize;
