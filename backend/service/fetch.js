// checkRajaOngkirFetch.js
const { getProvinces } = require("./rajaOngkirService");

async function checkRajaOngkirFetch() {
  try {
    const provinces = await getProvinces();
    console.log("Provinces:", provinces);
    console.log("RajaOngkir API fetch successful!");
  } catch (error) {
    console.error("RajaOngkir API fetch failed:", error);
  }
}

// Panggil fungsi untuk melakukan pemeriksaan fetch API RajaOngkir
checkRajaOngkirFetch();
