import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
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
      required: true,
    },
    mobile: String,
    image: {
      type: String,
      required: false,
    },
    passChanged: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["sadmin", "smoderator", "cclient", "cemployee", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    otp: {
      type: String,
      required: false,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("user", schema);

export default User;