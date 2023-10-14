const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const userController = require("../controllers/userController");

router.get("/", accountController.getUserAccount);
router.get("/all", accountController.getAllUsers);
router.get("/balance", userController.getUserBalance);

module.exports = router;
