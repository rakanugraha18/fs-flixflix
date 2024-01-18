const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AddressModel = sequelize.define(
  "AddressModel",
  {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address_line1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AddressModel",
    tableName: "address",
    timestamps: false,
  }
);

// Menambahkan pemanggilan sync
async function createTableIfNotExists() {
  try {
    // Sinkronkan model dengan database
    await AddressModel.sync({ force: false });

    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
}

createTableIfNotExists();
module.exports = AddressModel;
