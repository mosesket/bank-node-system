const transactionService = require('../services/transactionService');
const accountService = require('../services/accountService');

async function transfer(req, res) {
  try {
    const { fromAccountNumber, toAccountNumber, amount } = req.body; 

    if (!fromAccountNumber || !toAccountNumber || amount <= 0) {
      return res.status(400).json({ error: "Invalid transfer data" });
    }

    const createdTransaction = await transactionService.handleTransfer(fromAccountNumber, toAccountNumber, amount);
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userTransactions(req, res) {
  try {
    const userId = req.user.id;
    const accountNumber = await accountService.getUserAccountNumber(userId);
    const transactions = await transactionService.getTransactionsByAccountNumber(accountNumber);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  transfer,
  userTransactions,
};
