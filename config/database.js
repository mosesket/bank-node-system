const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log("Cannot connect to Mongoose");
    console.error(error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Database Disconnected");
});

module.exports = {
  connectToDatabase
};
