
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_URI } from "./config.js";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (error) {
    process.exit(1);
  }
};
export default connectDB;