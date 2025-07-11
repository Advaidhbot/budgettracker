const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { protect } = require("../middleware/auth");

router.post("/registerUser", userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.get("/getUser", protect, userController.getUser);
router.post("/forgot-password",userController.forgotPassword);
router.post("/reset-password",userController.resetPassword);

router.post("/send-otp", userController.forgotPassword);
router.post("/verify-otp-reset", userController.resetPassword);


module.exports = router;