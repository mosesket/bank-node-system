const accountRepository = require("../repository/accountRepository");
const userRepository = require("../repository/userRepository");

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

async function getAllUsers() {
  try {
    const users = await userRepository.getUsers();

    const usersData = await Promise.all(users.map(async (user) => {
      const accounts = await accountRepository.getAccountsByUserId(user._id);
      const transactions = await transactionRepository.getTransactionsByUserId(user._id); 
      return { user, accounts, transactions };
    }));

    return usersData;
  } catch (error) {
    throw error; 
  }
}

async function createAccount(accountData) {
  try {
    const user = await userRepository.createUser(accountData);
    
    accountData.owner = user._id; 
    const account = await accountRepository.createAccount(accountData);

    return { user, account };
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

async function getAccountById(accountId) {
  try {
    const account = await Account.findById(accountId);

    return account; 
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  login,
  createAccount,
  updateAccount,
  getAccountBalance,
  getAccountById,
};
