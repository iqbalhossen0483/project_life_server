const verifyRoles = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      throw { status: 401, message: "unauthorized user" };
    }
    next();
  };
};

module.exports = verifyRoles;
