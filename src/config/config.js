const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: process.env.SALT_ROUNDS,
  fontendUrl: process.env.FRONTEND_URL,
};

module.exports = config;
