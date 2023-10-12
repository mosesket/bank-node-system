const User = require("../models/user");

async function getUsers() {
  return User.find();
}

async function createUser(userData) {
  return User.create(userData);
}

async function findUserByPhone(phone) {
  try {
    return User.findOne({ phone });
  } catch (error) {
    throw error; 
  }
}


module.exports = {
  getUsers,
  createUser,
  findUserByPhone,
};
