const transactionRepository = require("../repository/transactionRepository");
const accountRepository = require("../repository/accountRepository");

async function handleWithdrawal(accountId, amount) {}

async function handleTransfer(fromAccountId, toAccountId, amount) {
  try {
    const fromAccount = await accountRepository.getAccountById(fromAccountId);
    const toAccount = await accountRepository.getAccountById(toAccountId);

    if (!fromAccount || !toAccount) {
      throw new Error("Accounts not found");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient balance in the sender's account");
    }

    // Deduct the amount from the sender's account
    fromAccount.balance -= amount;
    await accountRepository.updateAccount(fromAccount._id, { balance: fromAccount.balance });

    // Add the amount to the receiver's account
    toAccount.balance += amount;
    await accountRepository.updateAccount(toAccount._id, { balance: toAccount.balance });
    console.log(fromAccount.balance);
    console.log(toAccount.balance);

    const currentDate = new Date();
    console.log(currentDate);

    const transactionData = {
      fromAccount: fromAccountId,
      toAccount: toAccountId,
      amount,
      type: "Transfer",
      date: currentDate,
    };
    console.log(transactionData);

    const createdTransaction = await transactionRepository.createTransaction(transactionData);
    console.log('createdTransaction');
    console.log(createdTransaction);
    return createdTransaction;
    // return await transactionRepository.createTransaction(transactionData);
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
