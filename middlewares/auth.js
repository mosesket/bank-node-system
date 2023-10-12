const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRETKey, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, "secret");

    return decodedToken;
  } catch (error) {
    return null;
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRETKey, (err, user) => {
    if (err) res.status(403).send("A token is required for authentication");
    req.user = user;
    next();
  });
}

module.exports = {
  verifyToken,
  authenticateToken,
  generateAccessToken,
};
