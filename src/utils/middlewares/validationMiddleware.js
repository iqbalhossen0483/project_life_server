const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const firstError = error.details[0];

      res.status(400).json({
        message: 'Validation failed',
        error: firstError.message
      });
    } else {
      next();
    }
  };
};

export default validationMiddleware;
