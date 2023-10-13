const accountService = require("../services/accountService");

async function getAllUsers(req, res) {
  try {
    const users = await accountService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserAccount(req, res) {
  try {
    const userId = req.user.id;
    const usersData = await accountService.getAccountByUserId(userId);
    if (usersData) {
      res.status(200).json(usersData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserBalance(req, res) {
  try {
    const userId = req.user.id;
    const balance = await accountService.getUserBalance(userId);

    if (balance === null) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getUserAccount,
  getAllUsers,
  getUserBalance,
};
