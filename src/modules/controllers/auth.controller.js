const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");
const userModel = require("../models/user.model");
const { generateToken, sendOtp } = require("../services/auth.service");
const OtpModel = require("../models/otp.model");

// login user
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existUser = await userModel.findOne({ email: email });
  if (!existUser) {
    throw { status: 401, message: "authentication failed" };
  }

  const isValidPassword = await bcrypt.compare(password, existUser.password);

  if (!isValidPassword) {
    throw { status: 401, message: "authentication failed" };
  }

  const user = existUser.toObject();
  delete user.password;

  const token = generateToken(res, user);

  // return response
  res.send({
    success: true,
    user,
    token,
  });
});

// create new user
const register = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  const existUser = await userModel.findOne({ email });

  if (existUser) {
    throw { status: 409, message: "user already exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = new userModel({
    email,
    name,
    password: hashedPassword,
  });

  await data.save();
  const user = data.toObject();
  delete user.password;

  await sendOtp(data, "verify");

  const token = generateToken(res, user);

  res.send({
    success: true,
    token,
    user,
    message: "user registation successful And OTP sent to your email",
  });
});

// login user
const logout = catchAsync(async (req, res) => {
  // remove cookie
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  res.clearCookie("auth", {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  res.send({ success: true, message: "user logout successful" });
});

// get current user
const profile = catchAsync(async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .select("-password");

  if (!user) {
    throw { success: false, message: "No user found" };
  }

  res.send({ success: true, data: user });
});

// update profile
const updateProfile = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const data = await userModel.updateOne({ _id }, { $set: req.body });
  if (!data.modifiedCount) {
    throw { success: false, message: "profile update failed" };
  } else {
    res.send({ success: true, message: "profile update successful" });
  }
});

//send otp to varify email address;
const sendVefifyEmail = catchAsync(async (req, res) => {
  const { email, type } = req.body;
  const user = await userModel.findOne({ email }).select("-password");
  if (!user) {
    throw { message: "User not found", status: 404 };
  }
  if (type === "verify" && user.emailVerified) {
    throw { message: "Email already verified", status: 400 };
  }
  await sendOtp(user, type === "verify" ? "verify" : "reset");

  const token = generateToken(res, user);

  res.send({ success: true, token, message: "OTP sent to your email" });
});

//varify otp;
const varifyOtp = catchAsync(async (req, res) => {
  const { otp, email } = req.body;
  const user = await userModel.findOne({ email }).select("-password");
  if (!user) {
    throw { message: "User not found", status: 404 };
  }

  const findOTP = await OtpModel.findOne({ email });

  if (!findOTP) {
    throw { message: "OTP not found", status: 404 };
  }

  const isValidOtp = await bcrypt.compare(otp, findOTP.otp);
  if (!isValidOtp) {
    throw { message: "Invalid OTP", status: 401 };
  }

  if (findOTP.otpVerified) {
    throw { message: "OTP already verified", status: 401 };
  }
  // Verify OTP
  await OtpModel.findByIdAndUpdate(findOTP._id, {
    $set: { otpVerified: true },
  });
  // Update user's emailVerified status
  await userModel
    .findByIdAndUpdate(user._id, {
      $set: { emailVerified: true },
    })
    .select("-password");

  const token = generateToken(res, user);

  res.send({
    success: true,
    token,
    message: "OTP verified successfully",
  });
});

// Reset password
const resetPassword = catchAsync(async (req, res) => {
  const { email, password, otp } = req.body;
  const user = await userModel.findOne({ email }).select("-password");
  if (!user) {
    throw { message: "User not found", status: 404 };
  }
  const findOTP = await OtpModel.findOne({ email, otpVerified: true });
  const isValidOtp = await bcrypt.compare(otp, findOTP.otp);

  if (!findOTP || !isValidOtp) {
    throw { message: "OTP not found", status: 404 };
  }

  const newPassword = await bcrypt.hash(password, 10);
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: "Password updated successfully",
  });
});

module.exports = {
  login,
  register,
  logout,
  profile,
  updateProfile,
  sendVefifyEmail,
  varifyOtp,
  resetPassword,
};
