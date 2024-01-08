require("dotenv").config();
const fs = require("fs");

module.exports = {
  development: {
    username: "5vcnj4tvgn8xordktp9k",
    password: "pscale_pw_XCVlqTDwL2a80OZwMT95Y5syIG5lmya6t0oOgM00tKI",
    database: "flixflix_dev",
    host: "aws.connect.psdb.cloud",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
      bigNumberStrings: true,
    },
  },
  test: {
    username: "5vcnj4tvgn8xordktp9k",
    password: "pscale_pw_XCVlqTDwL2a80OZwMT95Y5syIG5lmya6t0oOgM00tKI",
    database: "flixflix_dev",
    host: "aws.connect.psdb.cloud",
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: "5vcnj4tvgn8xordktp9k",
    password: "pscale_pw_XCVlqTDwL2a80OZwMT95Y5syIG5lmya6t0oOgM00tKI",
    database: "flixflix_dev",
    host: "aws.connect.psdb.cloud",
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
