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
    typeOfAccount: Joi.string().required().messages({
      "any.required": "typeOfAccount is required",
      "string.base": "Type Of Account must be a string!",
    }),
    institutionId: Joi.number().required().messages({
      "any.required": "InstitutionId is required",
      "number.base": "Institution id must be a number",
    }),
    title: Joi.string().required().messages({
      "any.required": "title is required",
      "string.base": "title must be a string",
    }),
    phone: Joi.number().min(10).messages({
      "any.only": 'a mobile phone number is required',
      "string.base": "phone number must be a string",
      "string.min": "phone number must have a length of 10 integers",
    }),
  }),
});

export { loginValidation, signupValidation };
