const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/", accountController.getUserAccount);
router.get("/all", accountController.getAllUsers);
router.get("/balance", accountController.getUserBalance);

module.exports = router;
