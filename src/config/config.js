const config = {
  env: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX,
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: process.env.SALT_ROUNDS,
  fontendUrl: process.env.FRONTEND_URL,
  jwtExpiration: process.env.JWT_EXPIRE,
  cookieExiration: process.env.COOKEI_EXPIRE,
  emailHost: process.env.SMTP_HOST,
  emailPort: process.env.SMTP_PORT,
  smptUser: process.env.SMTP_USER,
  smptPass: process.env.SMTP_PASS,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPass: process.env.REDIS_PASSWORD,
  corsOrigin: process.env.CORS_ORIGIN,
  corsMethods: process.env.CORS_METHODS,
  corsCredintial: process.env.CORS_CREDENTIALS,
  corsAge: process.env.CORS_MAX_AGE,
};

module.exports = config;
