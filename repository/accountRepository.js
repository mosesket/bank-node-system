const Account = require("../models/account");

async function createAccount(accountData) {
  try {
    return await Account.create(accountData);
  } catch (error) {
    throw error;
  }
}

async function getAccountsByUserId(userId) {
  try {
    return await Account.find({ owner: userId });
  } catch (error) {
    throw error;
  }
}

async function updateAccount(accountId, updatedData) {
  try {
    return await Account.findByIdAndUpdate(accountId, updatedData, {
      new: true,
    });
  } catch (error) {
    throw error;
  }
}

async function getAccountById(accountId) {
  try {
    return await Account.findById(accountId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAccountsByUserId,
  createAccount,
  updateAccount,
  getAccountById,
};
