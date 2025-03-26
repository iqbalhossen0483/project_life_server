const express = require("express");
const router = express.Router();
const {
  login,
  register,
  profile,
  logout,
  varifyOtp,
  sendVefifyEmail,
  resetPassword,
  updateProfile,
} = require("../modules/controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
  logoutValidator,
  otpValidator,
  verifyEmailValidator,
  resetPasswordValidator,
  updateProfileValidator,
} = require("../modules/validators/auth.validators");
const isAuthenticated = require("../utils/isAuthenticate");

//login and register
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.patch("/logout", isAuthenticated, logoutValidator, logout);

//get profile
router.get("/me", isAuthenticated, profile);

//verify email and reset password
router.post("/verify/email", verifyEmailValidator, sendVefifyEmail);
router.post("/otp/verify", isAuthenticated, otpValidator, varifyOtp);
router.post(
  "/reset-password",
  isAuthenticated,
  resetPasswordValidator,
  resetPassword
);

//update profile
router.put("/update", isAuthenticated, updateProfileValidator, updateProfile);

module.exports = router;
