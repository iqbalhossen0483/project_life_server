const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw { status: 401, message: "authentication failed" };
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw { status: 401, message: "authentication failed" };
    }

    req.user = decoded.user;
    next();
  });
};

module.exports = isAuthenticated;
