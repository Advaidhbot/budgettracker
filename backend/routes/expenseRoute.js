const express = require('express');
const { protect } = require("../middleware/auth"); 

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseControllers");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/downloadExpenseExcel", protect, downloadExpenseExcel);

module.exports = router;