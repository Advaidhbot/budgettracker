const xlsx = require("xlsx");
const income = require("../model/income");
const mongoose  = require("mongoose");

exports.addIncome = async (req, res) => {
  const userId = req.userId;

  try {
    const { icon,source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res.status(400).json("Please provide all values");
    }

    console.log("add inc",req.body);
    
    const newIncome = new income({
      icon,
      userId:new mongoose.Types.ObjectId(String(req.user.id)),
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    return res.status(200).json(newIncome);
  } catch (error) {
    console.log(error);
    // return res.status(500).json("Server Error");
  }
};

exports.getAllIncome = async (req, res) => {
  console.log("User in income GET:", req.user);
  const userId = req.user.id;

  try {
    const incomeData = await income.find({ userId }).sort({ date: -1 });
    return res.status(200).json(incomeData);
  } catch (error) {
    console.error("❌ Error in getAllIncome:", error); // Better logging
    res.status(500).json("Server Error");
  }
};

exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    await income.findByIdAndDelete(req.params.id);
    return res.status(200).json("Income deleted successfully");
  } catch (error) {
    req.status(500).json("Server Error");
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomeData = await income.find({ userId }).sort({ date: -1 });

    const data = incomeData.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write workbook to buffer
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("❌ Error in downloadIncomeExcel:", error);
    res.status(500).json("Server Error");
  }
};