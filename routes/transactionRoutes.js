const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.transfer);
router.get("/", transactionController.userTransactions);

module.exports = router;
