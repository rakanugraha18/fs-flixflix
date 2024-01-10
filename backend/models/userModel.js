const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const { Op } = require("sequelize");
// const bcrypt = require("bcrypt");

const UserModel = sequelize.define(
  "UserModel",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
    timestamps: true,
  }
);

// // Hash the password before saving it to the database
// UserModel.beforeCreate(async (user) => {
//   const saltRounds = 10;
//   user.password = await bcrypt.hash(user.password, saltRounds);
// });

// // Method to register a new user
// UserModel.register = async function ({ username, email, password, fullname }) {
//   try {
//     const user = await UserModel.create({
//       username,
//       email,
//       password,
//       fullname,
//     });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// // Method to authenticate a user
// UserModel.authenticate = async function ({ email, password }) {
//   try {
//     const user = await UserModel.findOne({ where: { email } });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new Error("Invalid password");
//     }

//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// Menambahkan pemanggilan sync
// UserModel.sync({ force: true })
//   .then(() => {
//     console.log("Table created successfully");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err.message);
//   });

module.exports = UserModel;
