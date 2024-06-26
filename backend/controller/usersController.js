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
    // Check if the username contains spaces
    if (/\s/.test(username)) {
      return res
        .status(400)
        .json({ message: "Username cannot contain spaces" });
    }

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

    const usernameExists = await Users.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(400).json({
        message: "This username is already in use. Use a different one.",
      });
    }

    const emailExists = await Users.findOne({ where: { email } });
    if (emailExists) {
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
    return res.status(201).send(userData);
  } catch (error) {
    console.error("Error while creating user:", error);
    return next(error);
  }
};

//LOGIN USER

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({ message: "Please enter all the details" });
    }

    // Check if the identifier is an email or a username
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });

    const passwordMatched =
      user === null
        ? false
        : // COMPARE USER PASSWORD WITH USER HASPASSWORD IN DB
          await bcrypt.compare(password, user.password);
    if (!(user && passwordMatched)) {
      return res.status(401).json({
        error: "User or password is invalid",
      });
    }
    const userForToken = {
      username: user.username,
      email: user.email,
      user_id: user.user_id,
    };
    // Generate a JWT token for the authenticated User
    const token = sign(userForToken, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.send({
      username: user.username,
      email: user.email,
      user_id: user.user_id,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
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

// CONFRIM TOKEN TO BE CORRECT AND FETCH IT'S ENCRYPTED PARAMETERS
const actualToken = (req, res) => {
  // this is the only guy that an throw the req.user from the authMiddleware
  return res.json(req.user);
};

module.exports = {
  createUsers,
  login,
  updateUser,
  actualToken,
};
