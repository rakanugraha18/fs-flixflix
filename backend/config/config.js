const mysql = require("mysql2");
require("dotenv").config();
const fs = require("fs");

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "flixflix_test",
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: "root",
    password: null,
    database: "flixflix_production",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
