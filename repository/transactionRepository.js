const Transaction = require('../models/transaction');

async function saveTransaction(transactionData) {
}

async function getTransactionsByUser(userId) {
  try {
    return Transaction.find({ $or: [{ fromAccount: userId }, { toAccount: userId }] })
      .populate('fromAccount')
      .populate('toAccount');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getTransactionsByUserId,
};

module.exports = {
  saveTransaction,
  getTransactionsByUserId
};
