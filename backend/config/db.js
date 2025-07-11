const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect("mongodb://localhost:27017/personalBudgetTracker")
    .then(() => console.log("Connected to DataBase"))
    .catch((err) => console.log(err));

module.exports = connectDB;