const Account = require("../models/account");

async function createAccount(accountData) {
  try {
    return await Account.create(accountData);
  } catch (error) {
    throw error;
  }
}

async function getAccountsByUserId(userId) {
  return Account.find({ owner: userId });
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

async function findAccountById(accountNumber) {
  try {
    return await Account.findOne({ accountNumber });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAccountsByUserId,
  createAccount,
  updateAccount,
  findAccountById,
};
