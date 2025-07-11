const express = require('express');
const { protect } = require("../middleware/auth"); 

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeControllers");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadIncomeExcel", protect, downloadIncomeExcel);

module.exports = router;