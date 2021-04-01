import * as Joi from 'joi';

const checkPostInput = {
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
};

const checkPostId = {
  postId: Joi
    .number()
    .required(),
};

const updatePost = {
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
};

const getPosts = {
  skip: Joi
    .number()
    .required(),
  take: Joi
    .number()
    .required(),
  page: Joi
    .number()
    .required(),
};

const checkCommentInput = {
  postId: Joi
    .number()
    .required(),
  content: Joi
    .string()
    .required(),
};

const checkCommentId = {
  commentId: Joi
    .number()
    .required(),
};

const updateComment = {
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
};

export const postSchemas = {
  checkPostInput,
  checkPostId,
  updatePost,
  getPosts,
  checkCommentInput,
  checkCommentId,
  updateComment,
};
