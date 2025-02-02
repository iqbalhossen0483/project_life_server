import Joi from "joi";

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createUserValidator = Joi.object({
    email: Joi.string().email({}).required(),
    name: Joi.string().required(),
    mobile: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.empty": "mobile number is required",
        "string.pattern.base":
          "mobile number must contain only digits and be between 10 and 15 characters long",
      }),
    role: Joi.string().required(),
    password: Joi.string().required(),
  }).messages({
    "object.unknown": "Unknown fields are not allowed",
  })
;

export const refreshTokenValidator = Joi.object({
  refreshToken: Joi.string().required(),
});

export const forceLogoutValidator = Joi.object({
  userId: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

export const changePasswordValidator = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required(),
});

export const resetPasswordValidator = Joi.object({
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required(),
});


// import Joi from "joi";
//
// export const createUserValidator = Joi.object({
//   name: Joi.string().min(3).max(30).required().messages({
//     "string.empty": "Name is required",
//     "string.min": "Name must be at least 3 characters",
//     "string.max": "Name cannot be longer than 30 characters",
//   }),
// phone: Joi.string()
//   .pattern(/^[0-9]{10,15}$/)
//   .required()
//   .messages({
//     "string.empty": "Phone number is required",
//     "string.pattern.base":
//       "Phone number must contain only digits and be between 10 and 15 characters long",
//   }),
//   avatar: Joi.string().uri().allow("").messages({
//     "string.uri": "Avatar must be a valid URL",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.empty": "Email is required",
//     "string.email": "Email must be a valid email address",
//   }),
//   password: Joi.string().min(8).required().messages({
//     "string.empty": "Password is required",
//     "string.min": "Password must be at least 8 characters long",
//   }),
//   role: Joi.string()
//     .valid(
//       "system-admin",
//       "organization-admin",
//       "concern-admin",
//       "department-admin",
//     )
//     .required()
//     .messages({
//       "any.required": "Role is required",
//       "any.only": "Unrecognized role",
//     }),
// });
//
// export const loginValidator = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

