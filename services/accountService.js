const accountRepository = require("../repository/accountRepository");
const User = require("../models/user");
const Account = require("../models/account");

async function login(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return null; 
    }

    return user; 
  } catch (error) {
    throw error;
  }
}

async function createAccount(accountData) {
  return await accountRepository.createAccount(accountData);
}

async function updateAccount(accountId, updatedData) {
  return await accountRepository.updateAccount(accountId, updatedData);
}

async function getAccountBalance(accountId) {
  const account = await accountRepository.findAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance;
}

async function getAccountById(accountId) {
  try {
    const account = await Account.findById(accountId);

    return account; // Return the account (or null if not found)
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login,
  createAccount,
  updateAccount,
  getAccountBalance,
  getAccountById,
};
