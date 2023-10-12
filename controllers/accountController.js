const accountService = require("../services/accountService");

async function getAllUsers(req, res) {
  try {
    const users = await accountService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createAccount(req, res) {
  try {
    // const accountData = req.body;
    // const createdAccount = await accountService.createAccount(accountData);

    const demoAccountData = {
      accountNumber: '1234567894',
      accountType: 'Savings',
      balance: 1000.0,
      name: 'name',
      email: 'abcd@abcd.com',
      phone: '0980738098',
      password: 'password',
    };
    const createdAccount = await accountService.createAccount(demoAccountData);

    res.status(201).json(createdAccount);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAccountBalance(req, res) {
  try {
    const accountId = req.params.accountId;

    // checks user owns the account

    const balance = await accountService.getAccountBalance(accountId);

    if (balance === null) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllUsers,
  createAccount,
  getAccountBalance,
};
