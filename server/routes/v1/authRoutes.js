const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  resendVerificationEmail,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email/:verificationToken", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", protect, updatePassword);
router.get("/logout", protect, logout);

module.exports = router;
