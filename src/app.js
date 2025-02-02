import express from "express";
import dotenv from "dotenv";
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from "./config/db.config.js";
import routes from "./routes.js";
import errorHandler from "./utils/middlewares/error.middleware.js";
import allowedOrigins from './config/cors.config.js';

dotenv.config();

const app = express();

const DbConnect = async () => {
  try {
    await connectDB();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    setTimeout(DbConnect, 5000);
  }
};

await DbConnect();

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use(express.json());

app.use(helmet());

app.use("/api", routes);

app.use(errorHandler);

export default app;
