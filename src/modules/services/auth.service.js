const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const { generate } = require("otp-generator");
const bcrypt = require("bcrypt");
const sendEmail = require("../../utils/sendEmail");
const OtpModel = require("../models/otp.model");

const setAuthCookie = (res, user) => {
  const token = jwt.sign({ user }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  res.cookie("auth", token, {
    httpOnly: true,
    secure: config.env === "production",
    maxAge: config.cookieExiration,
  });

  return token;
};

//send otp;
const sendOtp = async (user, type) => {
  const otp = generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const getOtp = otp;
  await sendEmail({
    name: user.name,
    email: user.email,
    otp: parseInt(getOtp),
    subject: type === "verify" ? "Verify your email" : "Reset your password",
    type,
  });

  const hashedOtp = await bcrypt.hash(otp, 10);
  // Save OTP to database
  await OtpModel.deleteOne({ email: user.email });
  await OtpModel.create({
    email: user.email,
    otp: hashedOtp,
    otpVerified: false,
  });
};

module.exports = { setAuthCookie, sendOtp };
