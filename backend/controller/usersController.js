const db = require("../models");
const User = db.userModel;

//Menampilkan semua user
const findAllUsers = async (req, res) => {
  try {
    const dataUsers = await User.findAll();

    const result = {
      status: "ok",
      data: dataUsers,
    };
    res.json(result);
  } catch (error) {
    console.log(error, "<<<-- Error find all users");
  }
};

//Menampilkan user berdasarkan ID
const getUserById = async (req, res) => {
  try {
    //mendapatkan req params
    const { id } = req.params;

    const dataUser = await User.findByPk(id);
    if (dataUser === null) {
      return res.status(404).json({
        status: "failed",
        message: `data User with id ${id} is not found`,
      });
    }
    res.json({
      status: "ok",
      data: dataUser,
    });
  } catch (error) {
    console.log(error, "<<<- error get User by id");
  }
};

//Menambahkan User Baru
const createNewUser = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
      fullname,
    });

    res.status(201).json({
      status: "ok",
      data: newUser,
    });
  } catch (error) {
    console.log(error, "<<<- Error create new User");
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

// Update User
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if userId is valid
    if (!userId) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID",
      });
    }

    // Retrieve the existing user data
    const existingUser = await User.findByPk(userId);

    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: `User with ID ${userId} not found`,
      });
    }

    // Update the user with the new data from the request body
    const updatedUser = await existingUser.update(req.body);

    res.json({
      status: "success",
      message: "User updated successfully",
      userBeforeUpdate: existingUser,
      userUpdated: updatedUser,
    });
  } catch (error) {
    console.error(error, "<< Error updating User");
    next(error); // Pass the error to the next middleware (error handler)
  }
};

// Menghapus user berdasarkan ID
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if userId is valid
    if (!userId) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID",
      });
    }

    const userDataDeleted = await User.findByPk(userId);

    // Use UserModel.destroy with a where clause to delete the User
    const userDeleted = await User.destroy({
      where: { id_user: userId },
    });

    // Check if any rows were affected (user deleted)
    if (userDeleted === 0) {
      return res.status(404).json({
        status: "failed",
        message: `user with ID ${userId} not found`,
      });
    }

    res.json({
      status: "success",
      message: "user deleted successfully",
      userDeleted: userDataDeleted,
    });
  } catch (error) {
    console.error(error, "<< Error deleting user");
    next(error); // Pass the error to the next middleware (error handler)
  }
};

module.exports = {
  findAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
};
