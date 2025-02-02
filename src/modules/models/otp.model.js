const { Schema, default: mongoose } = require("mongoose");

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("Otp", OtpSchema);

module.exports = OtpModel;
