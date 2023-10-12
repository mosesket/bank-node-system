const express = require("express");
const auth = require("../middlewares/auth");
const AccountService = require("../services/accountService");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await AccountService.login(username, password);

  if (!user) {
    res.status(401).send("Invalid username or password.");
  } else {
    const token = auth.generateAccessToken(user);

    res.send({
      token,
    });
  }
});

router.get("/accounts", auth.verifyToken, async (req, res) => {
  const accountId = req.decodedToken.accountId;

  const account = await AccountService.getAccountById(accountId);

  if (!account) {
    res.status(404).send("Account not found.");
  } else {
    res.send(account);
  }
});

// router.post("/auth/signup", usersController.signup);
// router.post("/api/register", bankApi.register_a_user);
// router.post("/api/transfer", auth, bankApi.transfer_money);

module.exports = router;
