// rajaOngkirController.js
const rajaOngkirService = require("../service/rajaOngkirService");

// Contoh fungsi controller untuk mendapatkan daftar provinsi
async function getProvinces(req, res) {
  try {
    // Panggil fungsi getProvinces dari rajaOngkirService
    const provinces = await rajaOngkirService.getProvinces();

    // Kirim data provinsi sebagai respons ke klien
    res.status(200).json(provinces);
  } catch (error) {
    // Tangani kesalahan dan kirim sebagai respons ke klien
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCities(req, res) {
  // Fungsi controller untuk mendapatkan daftar kota berdasarkan provinsi
  try {
    const provinceId = req.query.province;

    // Periksa apakah parameter province ada
    if (!provinceId) {
      return res.status(400).json({ error: "Province parameter is required" });
    }

    // Mendapatkan daftar kota berdasarkan ID provinsi
    const cities = await rajaOngkirService.getCities(provinceId);

    res.status(200).json(cities);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getProvinces, getCities };
