const accountRepository = require("../repository/accountRepository");
const userRepository = require("../repository/userRepository");
const transactionRepository = require("../repository/transactionRepository");

async function createAccount(accountData) {
  try {
    return await accountRepository.createAccount(accountData);
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
        const transactions =
          await transactionRepository.getTransactionsByUserId(user._id);
        return { user, accounts, transactions };
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

async function getAccountBalance(accountId) {
  const account = await accountRepository.findAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance;
}

module.exports = {
  getAllUsers,
  createAccount,
  updateAccount,
  getAccountBalance,
};
