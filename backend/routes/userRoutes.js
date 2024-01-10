const {
  createUsers,
  login,
  updateUser,
  viewIndividualProfile,
  actualToken,
} = require("../controller/usersController");
const { validateToken } = require("../middleware/authMiddleware");
const userRouter = require("express").Router();

userRouter.post("/register", createUsers);
userRouter.post("/login", login);
userRouter.put("/updateUser/:name", updateUser);
userRouter.get("/:id", viewIndividualProfile);
userRouter.get("/verify/authToken", validateToken, actualToken);

module.exports = userRouter;
