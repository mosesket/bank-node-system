const User = require("../models/user");

async function getUsers() {
  return User.find().select("-password");
}

async function createUser(userData) {
  return User.create(userData);
}

async function getUserById(userId) {
  try {
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw error;
  }
}

async function findUserByPhone(phone) {
  try {
    return User.findOne({ phone });
  } catch (error) {
    throw error; 
  }
}


module.exports = {
  getUserById,
  getUsers,
  createUser,
  findUserByPhone,
};
