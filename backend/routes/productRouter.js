const product = require("../controller/productsController");
const { validateToken } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", product.findAllProducts);
router.get("/:id", product.getProductById);
router.get("/category/:category", product.getProductsByCategory);
router.post("/", validateToken, product.createNewProduct);
router.delete("/:id", validateToken, product.deleteProduct);
router.put("/:id", validateToken, product.updateProduct);

module.exports = router;
