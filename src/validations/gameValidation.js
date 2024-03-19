import Joi from "joi";
import validation from "./validation";

const gameSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "This field is required",
      "string.email": "Must be a valid email",
      "string.min": "Must be a valid email",
    })
    .allow(""),
  category: Joi.string().min(2).max(256).required(),
  image: Joi.object({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
});

const validateGame = (inputToCheck) =>
  // gameSchema.validate(inputToCheck, { abortEarly: false });
  validation(gameSchema, inputToCheck);

export { validateGame };
