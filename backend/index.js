const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT || 5001;
const router = require("./routes");
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");

const bodyParser = require("body-parser"); // atau const express = require("express"); jika versi Express 4.16+

// Menggunakan middleware body-parser untuk mengurai body dari permintaan HTTP
app.use(bodyParser.json()); // atau app.use(express.json()) jika versi Express 4.16+

app.use(express.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hi there");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
