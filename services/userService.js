const userRepository = require("../repository/userRepository");
const accountService = require('../services/accountService'); 
const bcrypt = require("bcrypt");

async function registerUser(userData) {
  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    userData.password = hashedPassword;

    const newUser = await userRepository.createUser(userData);

    const accountData = {
      accountNumber: "88" + generateRandomNumber(8),
      accountType: "Savings",
      balance: 0.0,
      owner: newUser._id,
    };

    function generateRandomNumber(digits) {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const newAccount = await accountService.createAccount(accountData);

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function loginUser(phone, password) {
  try {
    const user = await userRepository.findUserByPhone(phone);

    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
};
