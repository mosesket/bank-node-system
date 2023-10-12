const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/", accountController.getAllUsers);
router.get("/create", accountController.createAccount);
router.get("/:accountId/balance", accountController.getAccountBalance);

module.exports = router;
