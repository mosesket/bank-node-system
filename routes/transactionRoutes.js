const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.transfer);
router.get("/", transactionController.userTransactions);
// router.get("/all", transactionController.getAllTransactions);

module.exports = router;
