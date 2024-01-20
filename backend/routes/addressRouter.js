const address = require("../controller/addressController");
const { validateToken } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/", validateToken, address.createNewAddress);
router.get("/addresses/check", validateToken, address.checkAddress);

module.exports = router;
