const config = require("../config/config");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (config.env === "development") {
      console.log(error);
    } else {
      console.log(error.message);
    }
    next(error);
  });
};

module.exports = catchAsync;
