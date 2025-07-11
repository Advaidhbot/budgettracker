const xlsx = require("xlsx");
const Expense = require("../model/expense");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId; 
    const { icon, category, amount, date } = req.body;

    console.log("Add Expense Request Body:", req.body);

    if (!userId || !category || !amount || !date) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    return res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense Sheet");

    // Write to buffer
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers for download
    res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    res.send(buffer);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
