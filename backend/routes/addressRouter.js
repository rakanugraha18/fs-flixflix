const address = require("../controller/addressController");
const { validateToken } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/", validateToken, address.createNewAddress);

module.exports = router;
