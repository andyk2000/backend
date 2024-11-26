import { celebrate, Joi, Segments } from "celebrate";

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    names: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    email: Joi.string().required().email().messages({
      "any.required": "must add an Email",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().required().min(6).messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
    role: Joi.string().valid("owner", "customer").messages({
      "any.only": 'Role must be either "owner" or "customer"',
    }),
  }),
});

export { loginValidation, signupValidation };
