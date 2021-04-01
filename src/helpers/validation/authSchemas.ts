import * as Joi from 'joi';

const checkUser = {
  login: Joi
    .string()
    .min(1)
    .max(30)
    .required(),
  password: Joi
    .string()
    .min(1)
    .max(30)
    .required(),
};

const logoutUser = {
  access: Joi
    .string()
    .optional(),
  refresh: Joi
    .string()
    .required(),
  userID: Joi
    .number()
    .required(),
  isAdmin: Joi
    .boolean()
    .required(),
};

export const authValidation = {
  checkUser,
  logoutUser,
};
