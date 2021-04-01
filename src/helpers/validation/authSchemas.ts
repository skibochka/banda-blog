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
    .required(),
  refresh: Joi
    .string()
    .required(),
};

export const authValidation = {
  checkUser,
  logoutUser,
};
