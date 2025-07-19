const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect("mongodb://localhost:27017/personalBudgetTracker")
    .then(() => console.log("Connected to DataBase"))
    .catch((err) => console.log(err));

module.exports = connectDB;


// mongodb+srv://chandrayukth1:budegettracker123@cluster0.u60u4in.mongodb.net/budgettracker?retryWrites=true&w=majority&appName=Cluster0