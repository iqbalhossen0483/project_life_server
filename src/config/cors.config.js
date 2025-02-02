import config from "./config";

const allowedOrigins =
  config.env === "development"
    ? [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
      ]
    : ["https://your-production-frontend.com"];

export default allowedOrigins;
