const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT || 5001;
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRouter");
const addressRouter = require("./routes/addressRouter");
const rajaOngkirRouter = require("./routes/rajaOngkirRouter");
const errorMiddleware = require("./middleware/errorMiddleware");

const bodyParser = require("body-parser"); // atau const express = require("express"); jika versi Express 4.16+

// Menggunakan middleware body-parser untuk mengurai body dari permintaan HTTP
app.use(bodyParser.json()); // atau app.use(express.json()) jika versi Express 4.16+

app.use(express.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hi there");
});

// Use the user routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/rajaongkir", rajaOngkirRouter);

// Use the error handling middleware
app.use(errorMiddleware.errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
