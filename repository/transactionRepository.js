const Transaction = require('../models/transaction');

async function createTransaction(transactionData) {
  try {
    return await Transaction.create(transactionData);
  } catch (error) {
    throw error;
  }
}

async function getTransactionsByAccountNumber(accountNumber) {
  try {
    return await Transaction.find({ $or: [{ sender: accountNumber }, { receiver: accountNumber }] })
      .populate('fromAccount')
      .populate('toAccount');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTransaction,
  getTransactionsByAccountNumber,
};
