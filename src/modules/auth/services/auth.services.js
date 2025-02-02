import bcrypt from "bcrypt";
import User from "../../auth/models/user.model.js";
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// import AbilityModel from "../../auth/models/ability.model.js";
// import {
//   JWT_REFRESH_SECRET,
//   JWT_SECRET,
//   SALT_ROUNDS,
// } from "../../../config/config";

const login = asyncHandler(async ({ email, password }) => {
  const existUser = await User.findOne({ email: email });

  if (!existUser) {
    throw { status: 401, message: "Failed to Login" };
  }

  const isValidPassword = await bcrypt.compare(password, existUser.password);

  if (!isValidPassword) {
    throw { status: 401, message: "Password is Wrong" };
  }

  const user = existUser.toObject();
  delete user.password;
  delete user.status;
  delete user.role;

  // const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
  //   expiresIn: "1d",
  // });

  const token = jwt.sign({ user: user }, process.env.JWT_SECRET);

  return {
    success: true,
    user,
    token,
  }
});

const createUser = asyncHandler(async ({ email, name, mobile, role, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data = new User({
      email,
      name,
      mobile,
      role,
      password: hashedPassword,
      createdBy: null,
    });

    const userData = await data.save();
    const user = data.toObject();
    delete user.password;

    return userData;
  } catch (e) {
    console.log(e)
  }
});

const changePassword = asyncHandler(async ({ oldPassword, newPassword, userId }) => {

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw { status: 404, message: "User not found" };
  }
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    throw { status: 401, message: "Old password is wrong" };
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const response = await User.findByIdAndUpdate(user._id, {
    $set: { password: hashedPassword, passChanged: true },
  },
    { new: true }
  )
    .select("-password");

  return response;
});

const getUserInfo = asyncHandler(async (userId) => {
  const existUser = await User.findById(new mongoose.Types.ObjectId(userId));

  if (!existUser) {
    throw { status: 401, message: "Failed to Login" };
  }

  const user = existUser.toObject();
  delete user.password;

  return {
    success: true,
    user,
  }
});

export { login, createUser, changePassword, getUserInfo };
