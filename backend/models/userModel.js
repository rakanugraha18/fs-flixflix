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
      unique: true,
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

// Menambahkan pemanggilan sync
UserModel.sync({ force: false })
  .then(() => {
    console.log("Table created successfully");
  })
  .catch((err) => {
    console.error("Error creating table:", err.message);
  });

module.exports = UserModel;
