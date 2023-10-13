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
    return await Account.findOne({ owner: userId });
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

async function getAccountById(accountNumber) {
  try {
    return await Account.findOne({ accountNumber: accountNumber });
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
