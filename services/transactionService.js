const transactionRepository = require("../repository/transactionRepository");

async function handleWithdrawal(accountId, amount) {}

async function handleTransfer(transactionData) {
  try {
    return await transactionRepository.createTransaction(transactionData);
  } catch (error) {
    throw error;
  }
}

async function getTransactionsByUserId(userId) {
  try {
    return await transactionRepository.getTransactionsByUserId(userId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  handleWithdrawal,
  handleTransfer,
  getTransactionsByUserId,
};
