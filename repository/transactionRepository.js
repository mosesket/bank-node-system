const Transaction = require('../models/transaction');

async function createTransaction(transactionData) {
  try {
    return await Transaction.create(transactionData);
  } catch (error) {
    throw error;
  }
}

async function getTransactionsByUserId(userId) {
  try {
    return Transaction.find({ $or: [{ fromAccount: userId }, { toAccount: userId }] })
      .populate('fromAccount')
      .populate('toAccount');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTransaction,
  getTransactionsByUserId,
};
