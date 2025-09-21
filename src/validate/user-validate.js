import Joi from "joi";

const nameRegex = /^(?!\s)([A-Za-zก-๙]+\s?)+(?<!\s)$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z0-9@$!%*?&.]{8,12}$/;

export const registerSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(4)
    .max(60)
    .pattern(nameRegex)
    .required()
    .messages({
      "string.empty": "Please enter your first name",
      "string.min": "First name must be at least 4 characters",
      "string.max": "First name must not exceed 60 characters",
      "string.pattern.base":
        "First name must contain only Thai or English letters, no numbers or symbols",
    }),

  last_name: Joi.string()
    .trim()
    .min(4)
    .max(60)
    .pattern(nameRegex)
    .required()
    .messages({
      "string.empty": "Please enter your last name",
      "string.min": "Last name must be at least 4 characters",
      "string.max": "Last name must not exceed 60 characters",
      "string.pattern.base":
        "Last name must contain only Thai or English letters, no numbers or symbols",
    }),

  tel: Joi.string()
    .trim()
    .pattern(/^0[0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "Please enter your phone number",
      "string.pattern.base": "Phone number must be 10 digits and start with 0",
    }),

  password: Joi.string().trim().pattern(passwordRegex).required().messages({
    "string.empty": "Please enter your password",
    "string.pattern.base":
      "Password must be 8–12 characters, include at least one lowercase letter, one uppercase letter, one number, and one special character. Thai characters are not allowed.",
  }),

  confirm_password: Joi.string()
    .required()
    .messages({
      "string.empty": "Please enter your confirm password",
    })
    .custom((value, helpers) => {
      if (value !== helpers.state.ancestors[0].password) {
        return helpers.error("any.only");
      }
      return value;
    })
    .messages({
      "any.only": "Confirm password does not match password",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .pattern(emailRegex)
    .required()
    .messages({
      "string.empty": "Please enter your email",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Invalid email format",
    }),
});
