const accountService = require("../services/accountService");
const authentication = require('../middlewares/auth');

async function createAccount(req, res) {
  try {
    // const accountData = req.body;
    // const createdAccount = await accountService.createAccount(accountData);
    const demoAccountData = {
      accountNumber: '1234567890',
      accountType: 'Savings',
      balance: 1000.0,
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

    const token = req.header('Authorization');
    const decodedToken = authentication.verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = decodedToken.id;

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
  createAccount,
  getAccountBalance,
};
