const income = require("../model/income");
const expense = require("../model/expense");
const { isValidObjectId, Types } = require("mongoose");
const moment = require("moment");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income & Expense
    const totalIncome = await income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 Days Income
    const last60IncomeTransactions = await income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const IncomeLast60Days = last60IncomeTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // Last 30 Days Expense
    const last30ExpenseTransactions = await expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const ExpenseLast30Days = last30ExpenseTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // Recent Transactions
    const lastTransactions = [
      ...(await income.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...(await expense.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => b.date - a.date);

    // ✅ Last Month Savings
    const startOfLastMonth = moment().subtract(1, "months").startOf("month").toDate();
    const endOfLastMonth = moment().subtract(1, "months").endOf("month").toDate();

    const lastMonthIncomeTxns = await income.find({
      userId,
      date: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const lastMonthExpenseTxns = await expense.find({
      userId,
      date: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const lastMonthIncome = lastMonthIncomeTxns.reduce((sum, tx) => sum + tx.amount, 0);
    const lastMonthExpense = lastMonthExpenseTxns.reduce((sum, tx) => sum + tx.amount, 0);
    const lastMonthSavings = lastMonthIncome - lastMonthExpense;

    // ✅ Monthly Comparison Data (last 6 months)
    const monthlyComparison = [];

    for (let i = 5; i >= 0; i--) {
      const start = moment().subtract(i, "months").startOf("month").toDate();
      const end = moment().subtract(i, "months").endOf("month").toDate();
      const label = moment().subtract(i, "months").format("MMMM");

      const incomeTx = await income.aggregate([
        {
          $match: {
            userId: userObjectId,
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      const expenseTx = await expense.aggregate([
        {
          $match: {
            userId: userObjectId,
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      const incomeTotal = incomeTx[0]?.total || 0;
      const expenseTotal = expenseTx[0]?.total || 0;

      monthlyComparison.push({
        month: label,
        income: incomeTotal,
        expense: expenseTotal,
        savings: incomeTotal - expenseTotal,
      });
    }

    // Send response
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      totalSavings: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      last30Expenses: {
        total: ExpenseLast30Days,
        transactions: last30ExpenseTransactions,
      },
      last60DaysIncome: {
        total: IncomeLast60Days,
        transactions: last60IncomeTransactions,
      },
      lastMonthSavings: {
        income: lastMonthIncome,
        expense: lastMonthExpense,
        savings: lastMonthSavings,
      },
      monthlyComparison, // ✅ added
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json("Server Error");
  }
};
