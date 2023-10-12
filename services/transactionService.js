const transactionRepository = require('../repository/transactionRepository');

async function handleDeposit(accountId, amount) {
}

async function handleWithdrawal(accountId, amount) {
}

async function handleTransfer(fromAccountId, toAccountId, amount) {
}

async function handlePayment(accountId, payee, amount) {
}

module.exports = {
  handleDeposit,
  handleWithdrawal,
  handleTransfer,
  handlePayment,
};
