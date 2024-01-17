const db = require("../models");
const Users = db.UserModel;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const validator = require("validator");
const { sign } = require("jsonwebtoken");

// CREATE USERS

const isStrongPasswordCustom = (password) => {
  return password.length >= 6;
};
const createUsers = async (req, res, next) => {
  const { username, email, password, fullname } = req.body;

  try {
    // Check emptiness of the incoming data
    if (!username || !email || !password || !fullname) {
      return res.json({ message: "Please enter all the details" });
    }
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if (!isStrongPasswordCustom(password)) {
      return res.status(400).json({
        message: "Password is not strong enough.",
      });
    }
    // Check if the user already exists
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        message: "This email is already in use. Use a different one.",
      });
    }
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = await Users.create({
      username,
      email,
      password: passwordHash,
      fullname,
    });
    res.status(201).send(userData);
  } catch (error) {
    console.error("Error while creating user:", error);
    return next(error);
  }
};

//LOGIN USER
//LOGIN USER
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({ message: "Please enter all the details" });
    }

    // Check if the identifier is an email or a username
    const findUser = await Users.findOne({
      where: {
        [Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!findUser) {
      throw new Error("User not found please check email or username");
    } else {
      const checkPassword = await bcrypt.compare(password, findUser.password);
      if (checkPassword) {
        const accessToken = sign(
          { username: findUser.username, user_id: findUser.user_id },
          "importantsecrete",
          { expiresIn: "30d" }
        );
        return res.json({
          token: accessToken,
          username: findUser.username,
          user_id: findUser.user_id,
        });
      } else {
        throw new Error("Incorrect password");
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    return next(error);
  }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
  const { username, email, newPassword, oldPassword } = req.body;

  try {
    const user = await Users.findOne({
      where: { username: req.params.username },
    });

    if (!user) {
      throw new Error("Database error: User not found");
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.password);

    if (!checkPassword) {
      throw new Error("Database error: Incorrect old password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const updatedUser = await Users.update(
      {
        username: username,
        email: email,
        password: passwordHash,
      },
      { where: { username: req.params.username } }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error while updating user:", error);
    return next(error);
  }
};

// VIEW INDIVIDUAL PROFILE
const viewIndividualProfile = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: { user_id: req.params.user_id },
    });

    if (!user) {
      throw new Error("Database error: User not found");
    }

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error while fetching individual profile:", error);
    return next(error);
  }
};

// CONFRIM TOKEN TO BE CORRECT AND FETCH IT'S ENCRYPTED PARAMETERS
const actualToken = (req, res) => {
  // this is the only guy that an throw the req.user from the authMiddleware
  res.json(req.user);
};

module.exports = {
  createUsers,
  login,
  updateUser,
  viewIndividualProfile,
  actualToken,
};
