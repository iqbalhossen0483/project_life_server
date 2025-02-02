require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./config/config");
const authLimiter = require("./config/authlimiter.config");
const routes = require("./routes");
const { redis, queue } = require("./config/redis.config");

// initialize the app
const app = express();

// prefix
const prefix = config.apiPrefix;
console.log("API_PREFIX", prefix);
// env
const node_env = config.env;

// body parser
app.use(cookieParser());
app.use(express.json());

// set security HTTP headers
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: config.corsOrigin.split(","),
  methods: config.corsMethods.split(","),
  credentials: config.corsCredintial === "true",
  maxAge: config.corsAge,
};

// Enable CORS
app.use(cors(corsOptions));
// Handle preflight requests
app.options("*", cors(corsOptions));

// limit repeated failed requests to auth endpoints
if (node_env === "production") {
  app.use(`${prefix}/auth`, authLimiter);
}

// access the public folders
app.use(express.static(__dirname + "/public"));

// initialize hello text
app.get("/", (req, res) => {
  res.send("Hey Developer 🔥");
});

// Custom middleware for logging
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const msg = `${req.method} ${req.originalUrl} ${
      res.statusCode
    } ${duration} ms - ${res.get("Content-Length") || 0}`;
    console.log(msg);
  });
  next();
});

// api routes
app.use(`${prefix}`, routes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({ success: false, message });
});

// start the server
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB Connected:", config.mongoUri);

    // Start Express Server
    server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit process on failure
  }
}

// Handle Process Termination
process.on("SIGINT", async () => {
  console.log("\n🔄 Closing connections...");

  if (server) server.close();
  await mongoose.disconnect();
  await queue.close();
  await redis.quit(); // Ensure Redis connection is closed

  console.log("MongoDB and Redis disconnected. Exiting...");
  process.exit(0);
});

// Start the application
startServer();
