import * as Joi from 'joi';

function checkPost(data) {
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
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
        .required(),
    })
    .validate(data);
}

function checkId(data) {
  return Joi
    .object({
      postId: Joi
        .number()
        .required(),
    })
    .validate(data);
}

function checkParams(data) {
  return Joi
    .object({
      postId: Joi
        .number()
        .required(),
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
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
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
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

function checkComment(data) {
  return Joi
    .object({
      postId: Joi
        .number()
        .required(),
      content: Joi
        .string()
        .required(),
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
        .required(),
    })
    .validate(data);
}

function deleteComment(data) {
  return Joi
    .object({
      commentId: Joi
        .number()
        .required(),
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
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
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
        .required(),
    })
    .validate(data);
}

function checkCommentLikeParams(data) {
  return Joi
    .object({
      commentId: Joi
        .number()
        .required(),
      userId: Joi
        .number()
        .required(),
      isAdmin: Joi
        .boolean()
        .required(),
    })
    .validate(data);
}

export default {
  checkPost,
  checkId,
  checkParams,
  updatePost,
  getPosts,
  checkComment,
  deleteComment,
  updateComment,
  checkCommentLikeParams,
};
