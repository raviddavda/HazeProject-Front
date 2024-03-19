import Joi from "joi";
import validation from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "This field is required",
      "string.email": "Must be a valid email",
      "string.min": "Must be a valid email",
    })
    .required(),
  password: Joi.string()
    .messages({
      "string.empty": "This field is required",
    })
    .min(9)
    .max(40)
    .required(),
});

const validateLogin = (inputToCheck) => validation(loginSchema, inputToCheck);

export { validateLogin };
