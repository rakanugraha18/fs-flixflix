const { Op } = require("sequelize");
const db = require("../models");
const Address = db.addressModel;

//Menambahkan Alamat Baru
const createNewAddress = async (req, res) => {
  try {
    const {
      address_name,
      province,
      city,
      subdistrict,
      villages,
      full_address,
      postal_code,
      phone_number,
    } = req.body;

    // Ambil ID pengguna dari token
    const user_id = req.user_id;

    // Pastikan ID pengguna ada
    if (!user_id) {
      return res.status(401).json({
        status: "failed",
        message: "User ID not found in the token",
      });
    }

    const details = {
      user_id,
      address_name,
      province,
      city,
      subdistrict,
      villages,
      full_address,
      postal_code,
      phone_number,
    };

    const newAddress = await Address.create(details);

    res.status(201).json({
      status: "ok",
      data: newAddress,
    });
  } catch (error) {
    console.log(error, "<<<- Error create new address");
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

// Update address
const updateAddress = async (req, res, next) => {
  try {
    const addressId = req.params.id;

    // Check if addressId is valid
    if (!addressId) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid address ID",
      });
    }

    // Retrieve the existing address data
    const existingAddress = await Address.findByPk(addressId);

    // Check if the address exists
    if (!existingAddress) {
      return res.status(404).json({
        status: "failed",
        message: `Address with ID ${addressId} not found`,
      });
    }

    // Update the Address with the new data from the request body
    const updatedAddress = await existingAddress.update(req.body);

    res.json({
      status: "success",
      message: "Address updated successfully",
      addressBeforeUpdate: existingAddress,
      addressUpdated: updatedAddress,
    });
  } catch (error) {
    console.error(error, "<< Error updating Address");
    next(error); // Pass the error to the next middleware (error handler)
  }
};

// Menghapus address berdasarkan ID
const deleteAddress = async (req, res, next) => {
  try {
    const addressId = req.params.id;

    // Check if AddressId is valid
    if (!addressId) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid Address ID",
      });
    }

    const addressDataDeleted = await Address.findByPk(addressId);

    // Use Address.destroy with a where clause to delete the Address
    const addressDeleted = await Address.destroy({
      where: { id_address: addressId },
    });

    // Check if any rows were affected (Address deleted)
    if (addressDeleted === 0) {
      return res.status(404).json({
        status: "failed",
        message: `Address with ID ${addressId} not found`,
      });
    }

    res.json({
      status: "success",
      message: "address deleted successfully",
      addressDeleted: addressDataDeleted,
    });
  } catch (error) {
    console.error(error, "<< Error deleting address");
    next(error); // Pass the error to the next middleware (error handler)
  }
};

//Menampilkan semua Address
const findAllAddresss = async (req, res) => {
  try {
    const dataAddresss = await Address.findAll();

    const result = {
      status: "ok",
      data: dataAddresss,
    };
    res.json(result);
  } catch (error) {
    console.log(error, "<<<-- Error find all Addresss");
  }
};

//Menampilkan Address berdasarkan ID
const getAddressById = async (req, res) => {
  try {
    //mendapatkan req params
    const { id } = req.params;

    const dataAddress = await Address.findByPk(id);
    if (dataAddress === null) {
      return res.status(404).json({
        status: "failed",
        message: `data Address with id ${id} is not found`,
      });
    }
    res.json({
      status: "ok",
      data: dataAddress,
    });
  } catch (error) {
    console.log(error, "<<<- error get Address by id");
  }
};

const checkAddress = async (req, res) => {
  try {
    const user_id = req.user_id;

    // Pastikan ID pengguna ada
    if (!user_id) {
      return res.status(401).json({
        status: "failed",
        message: "User ID not found in the token",
      });
    }

    // Mencari alamat berdasarkan ID pengguna
    const userAddresses = await Address.findAll({
      where: { user_id },
    });

    res.json({
      status: "ok",
      data: userAddresses,
    });
  } catch (error) {
    console.error(error, "<< Error getting addresses by user");
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNewAddress,
  updateAddress,
  deleteAddress,
  findAllAddresss,
  getAddressById,
  checkAddress,
};
