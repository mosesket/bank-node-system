const transactionRepository = require("../repository/transactionRepository");
const accountRepository = require("../repository/accountRepository");

async function handleTransfer(fromAccountNumber, toAccountNumber, amount) {
  try {
    const fromAccount = await accountRepository.getAccountById(fromAccountNumber);
    const toAccount = await accountRepository.getAccountById(toAccountNumber);

    if (!fromAccount || !toAccount) {
      throw new Error("Accounts not found");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient balance in the sender's account");
    }

    fromAccount.balance -= amount;
    await accountRepository.updateAccount(fromAccount._id, { balance: fromAccount.balance });

    toAccount.balance += amount;
    await accountRepository.updateAccount(toAccount._id, { balance: toAccount.balance });

    const currentDate = new Date();

    const transactionData = {
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      sender: fromAccountNumber,
      receiver: toAccountNumber,
      amount,
      type: "Transfer",
      date: currentDate,
    };

    return await transactionRepository.createTransaction(transactionData);
  } catch (error) {
    throw error;
  }
}

async function getTransactionsByAccountNumber(accountNumber) {
  try {
    return await transactionRepository.getTransactionsByAccountNumber(accountNumber);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  handleTransfer,
  getTransactionsByAccountNumber,
};
