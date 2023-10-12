const transactionService = require('../services/transactionService');

async function withdraw(req, res) {
}

async function transfer(req, res) {
}

async function userTransactions(req, res) {
  try {
    const userId = req.user.id;

    const transactions = await transactionService.getTransactionsByUserId(userId);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  withdraw,
  transfer,
  userTransactions,
};
