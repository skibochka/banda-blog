import * as Joi from 'joi';

function checkUser(data) {
  return Joi
    .object({
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
    })
    .validate(data);
}

function logout(data) {
  return Joi
    .object({
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
    })
    .validate(data);
}

export default {
  checkUser,
  logout,
};
