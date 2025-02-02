import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Authorization token is missing',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid or expired token',
      });
    }

    req.user = decoded.user;
    next();
  });
};

export default isAuthenticated;
