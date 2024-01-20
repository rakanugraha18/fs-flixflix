const axios = require("axios");

const apiKey = "b1fe89afd5ccc80c4176569134f4c22b"; // Gantilah dengan API key Anda
const endpoint = "https://api.rajaongkir.com/starter"; // URL endpoint API RajaOngkir

// Contoh fungsi untuk mendapatkan daftar provinsi
async function getProvinces() {
  try {
    const response = await axios.get(`${endpoint}/province`, {
      headers: {
        key: apiKey,
      },
    });

    // Mengembalikan data provinsi
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

// Fungsi untuk mendapatkan daftar kota berdasarkan provinsi
async function getCities(provinceId) {
  try {
    const response = await axios.get(`${endpoint}/city`, {
      headers: {
        key: apiKey,
      },
      params: {
        province: provinceId,
      },
    });

    // Mengembalikan data kota
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

module.exports = { getProvinces, getCities };
