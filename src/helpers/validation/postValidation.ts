import * as Joi from 'joi';

function checkPost(data) {
  return Joi
    .object({
      title: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
      content: Joi
        .string()
        .min(30)
        .max(1000)
        .required(),
    })
    .validate(data);
}

function checkPostID(data) {
  return Joi
    .object({
      postID: Joi
        .number()
        .required(),
    })
    .validate(data);
}

function updatePost(data) {
  return Joi
    .object({
      postID: Joi
        .number()
        .required(),
      update: Joi
        .object({
          title: Joi
            .string()
            .min(3)
            .max(30)
            .required(),
          content: Joi
            .string()
            .min(3)
            .max(1000)
            .required(),
        })
        .required(),
    })
    .validate(data);
}

export default {
  checkPost,
  checkPostID,
  updatePost,
};
