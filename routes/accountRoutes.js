const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/create", accountController.createAccount);

// router.put("/:accountId/update", accountController.updateAccount);

// router.get("/:accountId/balance", accountController.getAccountBalance);

router.get("/", (req, res) => {
  res.send('Account page');
});

module.exports = router;
