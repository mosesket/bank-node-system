require("dotenv").config();

const express = require("express");
const { unless } = require("express-unless");
const { connectToDatabase } = require("./config/database");
const auth = require("./middlewares/auth.js");
const routes = require('./routes/index'); 

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

auth.authenticateToken.unless = unless;
const excludedPaths = ['/api/auth/login', '/api/auth/register'];
app.use(
  auth.authenticateToken.unless({
    path: excludedPaths,
  })
);

app.use('/api/v1', routes);

app.get("/", (req, res) => {
  res.send("Welcome to the Monolithic Banking Application");
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to start the server: ${error}`);
  });
