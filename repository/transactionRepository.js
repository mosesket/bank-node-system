const Transaction = require('../models/transaction');

async function saveTransaction(transactionData) {
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
  saveTransaction,
  getTransactionsByUserId,
};
