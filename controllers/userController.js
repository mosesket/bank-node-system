const userService = require("../services/userService.js");
const accountService = require("../services/accountService.js");
const transactionService = require("../services/transactionService.js");
const auth = require("../middlewares/auth");

async function registerUser(req, res) {
  try {
    const userData = req.body;

    if (!userData.name || !userData.phone || !userData.password) {
      return res.status(400).json({ error: "All input is required" });
    }

    const newUser = await userService.registerUser(userData);
    const token = auth.generateAccessToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { phone, password } = req.body;

    if (!(phone && password)) {
      return res.status(400).json({ error: "All input is required" });
    }

    const user = await userService.loginUser(phone, password);

    if (user) {
      const accessToken = auth.generateAccessToken(user);

      res.status(200).json({ user, accessToken });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
