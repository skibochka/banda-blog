import * as Joi from 'joi';

function checkPostInput(data) {
  return Joi
    .object({
      title: Joi
        .string()
        .min(3)
        .max(35)
        .required(),
      content: Joi
        .string()
        .min(3)
        .max(1000)
        .required(),
    })
    .validate(data);
}

function checkPostId(data) {
  return Joi
    .object({
      postId: Joi
        .number()
        .required(),
    })
    .validate(data);
}

function updatePost(data) {
  return Joi
    .object({
      postId: Joi
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
function getPosts(data) {
  return Joi
    .object({
      skip: Joi
        .number()
        .required(),
      take: Joi
        .number()
        .required(),
      page: Joi
        .number()
        .required(),
    })
    .validate(data);
}

function checkCommentInput(data) {
  return Joi
    .object({
      postId: Joi
        .number()
        .required(),
      content: Joi
        .string()
        .required(),
    })
    .validate(data);
}

function checkCommentId(data) {
  return Joi
    .object({
      commentId: Joi
        .number()
        .required(),
    })
    .validate(data);
}

function updateComment(data) {
  return Joi
    .object({
      commentId: Joi
        .number()
        .required(),
      update: Joi
        .object({
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
  checkPostInput,
  checkPostId,
  updatePost,
  getPosts,
  checkCommentInput,
  checkCommentId,
  updateComment,
};
