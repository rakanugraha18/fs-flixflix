const rajaOngkir = require("../controller/rajaongkirController");
const { validateToken } = require("../middleware/authMiddleware");
const router = require("express").Router();

// Tentukan endpoint untuk mendapatkan daftar provinsi
router.get("/province", rajaOngkir.getProvinces);
router.get("/city", rajaOngkir.getCities);

module.exports = router;
