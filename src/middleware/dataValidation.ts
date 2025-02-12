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
    institutionId: Joi.number().required().messages({
      "any.required": "InstitutionId is required",
      "number.base": "Institution id must be a number",
    }),
    title: Joi.string().required().messages({
      "any.required": "title is required",
      "string.base": "title must be a string",
    }),
    phone: Joi.number().min(10).messages({
      "any.only": "a mobile phone number is required",
      "number.base": "phone number must not be an integer",
      "number.min": "phone number must have a length of 10 integers",
    }),
  }),
});

const patientValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    names: Joi.string().required().messages({
      "any.required": "Full name of the patient are needed",
      "string.base": "the name must be a string",
    }),
    phone: Joi.number().min(9).max(9).messages({
      "any.only": "the mobile phone is required",
      "number.base": "phone number must not be an integer",
    }),
    age: Joi.number().required().messages({
      "any.only": "the mobile phone is required",
      "number.base": "phone number must not be an integer",
    }),
    address: Joi.string().required().messages({
      "any.required": "Full address of the patient are needed",
      "string.base": "the address must be a string",
    }),
    sex: Joi.string().required().messages({
      "any.required": "The gender of the patient is needed",
      "string.base": "the gender of the patient must be a string",
    }),
    dependent: Joi.boolean().messages({
      "boolean.base": "The dependent is either true or false",
    }),
    nationaId: Joi.number().min(16).max(16).required().messages({
      "any.required": "The Id of the patient is required",
      "number.base": "The gender must be a number",
    }),
  }),
});

export { loginValidation, signupValidation, patientValidation };
