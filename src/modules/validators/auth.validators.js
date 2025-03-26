const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  auth_type: joi.string().valid("email").default("email"),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const logoutSchema = joi.object({});

const verifyEmailSchema = joi.object({
  email: joi.string().email().required(),
  type: joi.string().valid("verify", "reset").required(),
});

const otpSchema = joi.object({
  email: joi.string().email().required(),
  otp: joi.string().required(),
});

const resetPasswordSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  otp: joi.string().required(),
});

const updateProfileSchema = joi.object({
  name: joi.string(),
  mobile: joi.string().min(11).max(11),
  about: joi.string(),
  location: joi.string(),
});

const registerValidator = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

const loginValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

const logoutValidator = (req, res, next) => {
  const { error } = logoutSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

const verifyEmailValidator = (req, res, next) => {
  const { error } = verifyEmailSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

const otpValidator = (req, res, next) => {
  const { error } = otpSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

const resetPasswordValidator = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

const updateProfileValidator = (req, res, next) => {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
  next();
};

module.exports = {
  registerValidator,
  loginValidator,
  logoutValidator,
  verifyEmailValidator,
  otpValidator,
  resetPasswordValidator,
  updateProfileValidator,
};
