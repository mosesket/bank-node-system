const userRepository = require("../repository/userRepository");
const accountRepository = require("../repository/accountRepository");
const transactionRepository = require("../repository/transactionRepository");

async function createAccount(accountData) {
  try {
    return await accountRepository.createAccount(accountData);
  } catch (error) {
    throw error;
  }
}

async function getAccountBuUserId(userId) {
  try {
    const user = await userRepository.getUserById(userId);
    const accounts = await accountRepository.getAccountsByUserId(userId);
    const transactions = await transactionRepository.getTransactionsByUserId(userId);

    return { user, accounts, transactions };
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const users = await userRepository.getUsers();

    const usersData = await Promise.all(
      users.map(async (user) => {
        const accounts = await accountRepository.getAccountsByUserId(user._id);
        return { user, accounts };
      })
    );

    return usersData;
  } catch (error) {
    throw error;
  }
}

async function updateAccount(accountId, updatedData) {
  return await accountRepository.updateAccount(accountId, updatedData);
}

async function getUserBalance(userId) {
  const account = await accountRepository.getAccountsByUserId(userId);
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance;
}

module.exports = {
  getAccountBuUserId,
  getAllUsers,
  createAccount,
  updateAccount,
  getUserBalance,
};
