const user = require("../controller/usersController");
const router = require("express").Router();

router.get("/users", user.findAllUsers);
router.get("/users/:id", user.getUserById);
router.post("/users", user.createNewUser);
router.delete("/users/:id", user.deleteUser);
router.put("/users/:id", user.updateUser);

module.exports = router;
