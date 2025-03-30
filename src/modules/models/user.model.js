const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    hospital_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    dob: String,
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    profession: {
      type: String,
      enum: ["doctor", "nurse"],
    },
    city: String,
    address: String,
    mobile: String,
    image: String,
    auth_type: {
      type: String,
      required: false,
      default: "email",
      enum: ["email", "mobile"],
    },
    about: String,
    location: String,
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model("User", schema);
module.exports = userModel;
