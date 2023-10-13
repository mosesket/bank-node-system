const transactionService = require('../services/transactionService');

async function withdraw(req, res) {
}

async function transfer(req, res) {
}

async function transfer(req, res) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body; 

    if (!fromAccountId || !toAccountId || amount <= 0) {
      return res.status(400).json({ error: "Invalid transfer data" });
    }

    const createdTransaction = await transactionService.handleTransfer(fromAccountId, toAccountId, amount);
    console.log(createdTransaction);
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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
