const User = require("../models/user");

async function getUsers() {
  return User.find();
}

async function createUser(userData) {
  return User.create(userData);
}

module.exports = {
  getUsers,
  createUser,
};
