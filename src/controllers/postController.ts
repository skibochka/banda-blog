import * as express from 'express';
import { Conflict, NotFound } from 'http-errors';
import { createQueryBuilder } from 'typeorm';
import postValidation from '../helpers/validation/postValidation';
import { ValidationError } from '../helpers/validation/ValidationError';
import { model } from '../helpers/db/repository';
import { Post } from '../models/Post';
import { Like } from '../models/Likes';
import { Comment } from '../models/Comment';
import { CommentLike } from '../models/CommentLike';
import { User } from '../models/User';

async function createPost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPost(req.body);
  if (error) throw new ValidationError(error.details);

  const user = await model(User).findOne(req.body.userId);

  await model(Post).save({
    title: req.body.title,
    content: req.body.content,
    user,
  });

  return res.status(200).json({
    title: req.body.title,
    content: req.body.content,
  });
}

async function deletePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkParams(req.body);
  if (error) throw new ValidationError(error.details);

  if (!req.body.isAdmin) {
    const post: Post = await model(Post).findOne({ id: req.body.postId, user: req.body.userId });
    if (!post) throw new Conflict('You can`t delete posts of other users');
  }

  await model(Post).delete(req.body.postId);

  return res.status(200).json({
    msg: 'Post successful deleted',
  });
}

async function updatePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.updatePost(req.body);
  if (error) throw new ValidationError(error.details);

  if (!req.body.isAdmin) {
    const post: Post = await model(Post).findOne({ id: req.body.postId, user: req.body.userId });
    if (!post) throw new Conflict('You can`t update posts of other users');
  }

  await model(Post).update(req.body.postId, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkParams(req.body);
  if (error) throw new ValidationError(error.details);

  if (await model(Like).findOne({
    post: req.body.postId,
    user: req.body.userId,
  })) throw new Conflict('You have already liked this post');

  const post = await model(Post).findOne({ id: req.body.postId });
  const user = await model(User).findOne({ id: req.body.userId });

  await model(Like).save({ post, user });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

async function getPost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkId(req.query);
  if (error) throw new ValidationError(error.details);

  const post: Post = await model(Post).findOne(req.query.postId as string, { loadRelationIds: true });
  if (!post) throw new NotFound('Such post does not exist');

  return res.status(200).json(post);
}

async function getComments(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkId(req.query);
  if (error) throw new ValidationError(error.details);

  const comments = await model(Comment).find({ postID: Number.parseInt(req.query.postID as string, 10), loadRelationIds: true });

  return res.status(200).send(comments);
}

async function getPosts(req: express.Request, res: express.Response) {
  const { error } = postValidation.getPosts(req.query);
  if (error) throw new ValidationError(error.details);

  const skip: number = Number.parseInt(req.query.skip as string, 10);
  const page: number = Number.parseInt(req.query.page as string, 10);
  const take: number = Number.parseInt(req.query.take as string, 10);

  const posts: Post[] = await model(Post).find({
    skip: skip * page,
    take,
  });
  if (!posts) throw new NotFound('Posts not found');

  return res.status(200).send(posts);
}

async function createComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkComment(req.body);
  if (error) throw new ValidationError(error.details);

  const user = await model(User).findOne({ id: req.body.userId });
  const post = await model(Post).findOne({ id: req.body.postId });

  await model(Comment)
    .save({
      content: req.body.content,
      post,
      user,
    });

  return res.status(200).json({ content: req.body.content });
}

async function deleteComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.deleteComment(req.body);
  if (error) throw new ValidationError(error.details);

  if (!req.body.isAdmin) {
    const comment: Comment = await model(Comment).findOne({ id: req.body.commentId, user: req.body.userId });
    if (!comment) throw new Conflict('You can`t delete comments of other users');
  }

  await model(Comment).delete(req.body.commentId);

  return res.status(200).json({
    msg: 'Comment successful deleted',
  });
}

async function updateComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.updateComment(req.body);
  if (error) throw new ValidationError(error.details);

  if (!req.body.isAdmin) {
    const comment: Comment = await model(Comment).findOne({ id: req.body.commentId, user: req.body.userId });
    if (!comment) throw new Conflict('You can`t update comments of other users');
  }

  await model(Comment).update(req.body.commentId, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likeComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkCommentLikeParams(req.body);
  if (error) throw new ValidationError(error.details);

  if (await model(CommentLike).findOne({
    comment: req.body.commentId,
    user: req.body.userId,
  })) throw new Conflict('You have already liked this comment');

  const comment = await model(Comment).findOne({ id: req.body.commentId });
  const user = await model(User).findOne({ id: req.body.userId });

  await model(CommentLike).save({ comment, user });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

export {
  createPost,
  deletePost,
  updatePost,
  likePost,
  getPost,
  getComments,
  getPosts,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
};
