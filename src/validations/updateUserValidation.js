import Joi from "joi";
import validation from "./validation";

const userUpdateSchema = Joi.object({
  name: Joi.object().keys({
    first: Joi.string()
      .min(2)
      .max(256)
      .messages({
        "string.empty": "This field is required",
        "string.min": "Must contain alteast 2 characters",
      })
      .required(),
    middle: Joi.string()
      .min(2)
      .max(256)
      .messages({ "string.min": "Must contain alteast 2 characters" })
      .allow(""),
    last: Joi.string()
      .min(2)
      .max(256)
      .messages({
        "string.empty": "This field is required",
        "string.min": "Must contain alteast 2 characters",
      })
      .required(),
  }),
  phone: Joi.string()
    .min(9)
    .max(11)
    // eslint-disable-next-line
    .pattern(/^[\+]?[(]?[0-9]{3,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .messages({
      "string.empty": "This field is required",
      "string.min": "Must be a valid Israeli phone number",
      "string.pattern.base": "Must be a valid Israeli phone number",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .messages({
      "string.empty": "This field is required",
      "string.email": "Must be a valid email",
      "string.min": "Must be a valid email",
    })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .messages({
      "string.pattern.base":
        "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
      "string.empty": "This field is required",
    })
    .min(9)
    .max(40)
    .required(),
  image: Joi.object().keys({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object().keys({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string()
      .min(2)
      .max(256)
      .messages({ "string.empty": "This field is required" })
      .required(),
    city: Joi.string()
      .min(2)
      .max(256)
      .messages({ "string.empty": "This field is required" })
      .required(),
    street: Joi.string()
      .min(2)
      .max(256)
      .messages({ "string.empty": "This field is required" })
      .required(),
    houseNumber: Joi.number()
      .min(2)
      .max(256)
      .messages({
        "string.empty": "This field is required",
        "number.base": "House Number must be a number",
      })
      .required(),
    zip: Joi.string()
      .min(2)
      .allow("")
      .messages({ "number.min": "ZIP must have at least 2 numbers" }),
  }),
  isBusiness: Joi.boolean(),
});

const validateUserUpdate = (inputToCheck) =>
  // registerSchema.validate(inputToCheck, { abortEarly: false });
  validation(userUpdateSchema, inputToCheck);

export { validateUserUpdate };
